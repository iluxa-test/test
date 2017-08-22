MyForm = {
    validate: function() {
        const arr = [];

        // fio validation
        const fio = document.forms["myForm"].elements["fio"].value;
        if (fio.length > 0) {
            if (fio.match(/\w+/g).length !== 3) {
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
                    url: document.getElementById("myForm").getAttribute("action"),
                    success: function(data) {
                        const resultContainerElement=document.getElementById("resultContainer");
                        resultContainerElement.className="";
                        if (data.status === "success"){
                            resultContainerElement.classList.add("success");
                            resultContainerElement.innerHTML = "Success";
                            clearTimeout(timeOut);
                        }
                        else if (data.status === "error"){
                            resultContainerElement.classList.add("error");
                            resultContainerElement.innerHTML = data.reason;
                            clearTimeout(timeOut);
                        }
                        else if (data.status === "progress"){
                            resultContainerElement.classList.add("progress");
                            setTimeout(executeQuery, data.timeout);
                        }
                    }
                });
            }
            executeQuery();
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
        const myForm = document.forms["myForm"];
        myForm.elements["fio"].value = data.fio;
        myForm.elements["email"].value = data.email;
        myForm.elements["phone"].value = data.phone;
    }
};