myForm = {
    validate: function() {
        const arr = [];

        // fio validation
        const fio = document.forms["myForm"].elements["fio"].value;
        if (fio.length > 0) {
            if (fio.match(/\S+/g).length !== 3) {
                arr.push("fio");
            }
        }
        else {
            arr.push("fio");
        }
        // email validation
        const email = document.forms["myForm"].elements["email"].value;
        if (email.length > 0){
            if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex.com)$/.test(email))) {
                arr.push("email");
            }
        }
        else {
            arr.push("email");
        }
        // phone validation
        const phone = document.forms["myForm"].elements["phone"].value;
        if (phone.length > 0){
            if (!(/^(\+7\(\d{3}\)\d{3}-\d{2}-\d{2})/.test(phone)) ||
                (phone.match(/\d/g).reduce((a, b) => parseInt(a) + parseInt(b), 0) > 30)){
                arr.push("phone");
            }
        }
        else {
            arr.push("phone");
        }
        if (arr.length > 0){
            return {
                isValid: false,
                errorFields: arr
            }
        }
        else{
            return{
                isValid:true,
                errorFields: arr
            }
        }
    },
    submit: function() {
        const validationResult = this.validate();
        document.querySelectorAll("input[type=text]").forEach(function (element) {
            if (validationResult.errorFields.includes(element.name)){
                element.classList.add("error");
            }
            else{
                element.classList.remove("error");
            }
        });
        if (validationResult.isValid){
            document.getElementById("submitButton").disabled = true;
            function executeQuery() {
                let timeOut;
                $.ajax({
                    url: 'progress.json',
                    success: function(data) {
                        if (data.status === "success"){
                            document.getElementById("resultContainer").classList.add("success");
                            document.getElementById("resultContainer").innerHTML = "Success";
                            clearTimeout(timeOut);
                        }
                        else if (data.status === "error"){
                            document.getElementById("resultContainer").classList.add("error");
                            document.getElementById("resultContainer").innerHTML = data.reason;
                            clearTimeout(timeOut);
                        }
                        else if (data.status === "progress"){
                            document.getElementById("resultContainer").classList.add("progress");
                        }
                    }
                });
                timeOut = setTimeout(executeQuery, 5000); // you could choose not to continue on failure...
            }

            executeQuery();

/*            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'progress.json', false);
            xhr.send();
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            } else {
                const response = JSON.parse(xhr.responseText);
                if (response.status === "success"){
                    document.getElementById("resultContainer").classList.add("success");
                    document.getElementById("resultContainer").innerHTML = "Success";
                }
                else if (response.status === "error"){
                    document.getElementById("resultContainer").classList.add("error");
                    document.getElementById("resultContainer").innerHTML = response.reason;
                }
                else {
                    document.getElementById("resultContainer").classList.add("progress");
                    do {
                        setTimeout(this.submit,response.timeout);
                    } while (response.status === "progress")
                }
            } */
        }
    },
    getData: function () {
        return {
            fio: document.forms["myForm"].elements["fio"].value,
            email: document.forms["myForm"].elements["email"].value,
            phone: document.forms["myForm"].elements["phone"].value
        }
    },
    setData: function (data) {
        document.forms["myForm"].elements["fio"].value = data.fio;
        document.forms["myForm"].elements["email"].value = data.email;
        document.forms["myForm"].elements["phone"].value = data.phone;
    }
};