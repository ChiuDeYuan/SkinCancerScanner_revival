const uploadImage = async (imageBASE64:string) => {

        fetch('http://116.241.64.125:8080/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({data: imageBASE64}),
        })
        .then(response => response.json())
        .then( data => console.log(data['predict']))
        .catch(error => console.log(error));
}

export default uploadImage;