<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ReplyToCustumerMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactUsMessages;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Interfaces\EmailInterface;

class EmailController extends Controller
{
    //
    private  EmailInterface $emailRepo;

    public function __construct(EmailInterface $emailRepo)
    {
        $this->emailRepo = $emailRepo;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {

            $skip = $request['skip'];
            $take = $request['take'];

            $messages = $this->emailRepo->index($skip, $take);

            if($messages) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'messages' => $messages
                ], 200);
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Something went wrong',
                ], 200);
            }

        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try{
            $validate = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|max:255',
                'message' => 'required|max:900',
            ]);

            if($validate) {
                DB::beginTransaction();
                $data = $request->all();

                $emailData = $data;

                if($data['custom_input_form'] && count($data['custom_input_form'])) {
                    $data['custom_input_form'] = json_encode($data['custom_input_form']);
                }


                $this->emailRepo->store($data);
                $userEmails = User::where('notification_switch', true)->select('email')->get()->toArray();

                foreach ($userEmails as $email) {
                    Mail::to($email['email'])->send(new ContactUsMessages($emailData));
                }

                DB::commit();
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'We have received your message.Will contact you soon',
                ], 200);
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Something went wrong',
                ], 200);
            }
        } catch (\Exception $exception) {
            DB::rollBack();
            dd($exception);
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function reply(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->all();



            Mail::to($request['messageReceiverData']['email'])->send(new ReplyToCustumerMessage($data));

            $this->emailRepo->replied($data['messageReceiverData']['id']);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your message has been sent',
            ], 200);

        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
