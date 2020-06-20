const deBounce = (func, delay=350) => {
    let timeOut;

    return function(){
        clearTimeout(timeOut);
        timeOut = setTimeout(()=>{
            func.apply(this, arguments) 
        }, delay)
    }
}

export default deBounce;