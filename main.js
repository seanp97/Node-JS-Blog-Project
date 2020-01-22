function localStorageLoggedIn() {
    var href = window.location.href;

    if (href == "http://localhost:8082/loginuser" && $("h1").text() == "Logged in") {
        localStorage.setItem("LoggedIn", "true");
    }
    if (localStorage.getItem("LoggedIn") != "true") {
        $(".nav.navbar-nav li:nth-of-type(2)").remove();
        $("#blogID").remove();
        $("#blogHeading").remove();
    }
}

$(document).ready(function () {
    $("#addblog").click(function () {
        $('#blogTitle, #blogBody').parents('form').eq(0).submit();
    });
    localStorageLoggedIn();
});
