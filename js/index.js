
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
            switch (code.toLocaleLowerCase()) {
                case "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter":
                    location.href = "https://fr.wikipedia.org/wiki/Pastafarisme"
                    break
                case "oeuf":
                    location.href = "https://maio-egg.tk/html/image.html"
                    break
                case "sarkozy":
                    location.href = "https://www.audible.fr/pd/Le-Temps-des-Tempetes-Livre-Audio/B096W2DDK6"
                    break
            }

            code = ""
        }, 1500)

        window.addEventListener("keyup", e => {
            code += e.key
            code_end()
        })