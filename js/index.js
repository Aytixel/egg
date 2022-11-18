
        function debounce(callback, delay){
            let timer

            return function(){
                let args = arguments, context = this

                clearTimeout(timer)

                timer = setTimeout(function () {
                    callback.apply(context, args)
                }, delay)
            }
        }

        document.getElementsByTagName("video")[0].playbackRate = 0.75
        
        let code = ""
        const code_end = debounce(() => {
            switch (code) {
                case "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightbaEnter":
                    location.href = "https://fr.wikipedia.org/wiki/Pastafarisme"
                    break
                case "oeuf":
                    location.href = "https://maio-egg.tk/html/image.html"
                    break
            }

            code = ""
        }, 1500)

        window.addEventListener("keyup", e => {
            code += e.key
            code_end()
        })