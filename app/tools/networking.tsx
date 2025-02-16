const uploadImage = async (imageBASE64:string) => {
    try{

        const response = await fetch('http://116.241.64.125:8080/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({data: imageBASE64}),
        });

        const data = await response.json();
        return parseFloat((data['predict'][0][1]*100).toFixed(1));

    }
    catch(e){
        console.error(e);
        throw e;
    }

}

export default uploadImage;