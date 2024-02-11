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

                const randomParam = Math.floor(Math.random() * 1000000);

                axios.delete(`/delete-image/${data}?_=${randomParam}`).then((res) => {
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
                axios.delete(`/delete-image-from-db/${data}`, {
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
