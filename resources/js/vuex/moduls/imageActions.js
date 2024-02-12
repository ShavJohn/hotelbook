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
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        imageDelete(context, data) {
            return new Promise((resolve, reject) => {

                const dotIndex = data.lastIndexOf('.');
                let imageName = data.substring(0, dotIndex);

                axios.delete(`/delete-image/${imageName}`).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        },
        imageDeleteFromDb(context, data) {
            return new Promise((resolve, reject) => {
                const dotIndex = data.lastIndexOf('.');
                let imageName = data.substring(0, dotIndex);

                axios.delete(`/delete-image-from-db/${imageName}`, {
                    data: data
                }).then((res) => {

                    resolve(res)
                }).catch((err) => {
                    if(err && err.data) {
                        context.dispatch('alert/alertResponse', {
                            'type': err.data.type,
                            'status': err.status,
                            'message': err.data.message
                        }, { root:true })
                    }
                    reject(err)
                })
            })
        }
    }
}
