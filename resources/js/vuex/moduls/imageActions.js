export default {
    namespaced: true,
    actions: {
        imageUpload(context, data) {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            return new Promise((resolve, reject) => {
                axios.post('/upload-image', data,config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        },
        imageDelete(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/delete-image/${data}`).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        },
        imageDeleteFromDb(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/delete-image-from-db/${data}`, {
                    data: data
                }).then((res) => {

                    resolve(res)
                }).catch((err) => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })
                    reject(err)
                })
            })
        }
    }
}
