$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
});

document.getElementById("submit").onclick = function () {
    location.href = "http://192.168.2.7:3000/submit";
};

document.getElementById("delete").onclick = function () {
    location.href = "http://192.168.2.7:3000/delete";
};