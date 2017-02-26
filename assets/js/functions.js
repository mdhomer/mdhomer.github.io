function pimage_loaded(image){
    if (image.clientHeight > image.clientWidth) {
        image.style.top = 0;
    }
    else {
        console.log(image.parentElement.clientHeight);
        height = image.parentElement.clientHeight;
        width = image.parentElement.clientWidth;
        //stretch the image to fit the box size, for presentation reasons, doesnt affect image proportions noticably.
        if (image.style.height < (height)) {
            image.style.width = width + 'px';
            //image.style.height = height + 'px';
        }
        //image.style.bottom = 0;
        image.style.top = (height - image.clientHeight)/2 + 'px';
        //console.log(value);
    }
}
