function downloadImages() {
    let imgs = document.querySelectorAll('.muuri-item-shown div.foto img.foto-grid__thumb');

    let time = 0;
    for (let i = 0; i < imgs.length; i++) {
        setTimeout(() => {
            let file = imgs[i].src.replace('thumb_', '')
            let imageName = 'imagem_' + (i + 1).toString().padStart(3, '0') + '.jpg'
            console.log(i, imageName, file);
            fetch(file, {
                method: 'GET',
                mode: 'no-cors',
                credentials: 'include',
                headers: { Accept: 'application/json' }
            })
                .then(resp => resp.status == 200 ? resp.blob() : Promise.reject(resp))
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = imageName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log('Baixou: ' + imageName);
                }).catch(() => {
                    console.log('Erro para baixar');
                });
        }, time);
        time += 1000;
    }
}
