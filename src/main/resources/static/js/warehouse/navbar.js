$(document).ready(function () {
  let session = localStorage.getItem("session");
  let count = 0;

  if (session === null) {
    $("#loginStatus").text("Guest");
  } else {
    let user = JSON.parse(localStorage.getItem("session"));
    $("#loginStatus").text(`${user.username}`);
    $("#navUser").append(
      '<button id="logoutNav" class="btn btn-secondary" style="margin-left: 15px;"><i class="fas fa-sign-out-alt"></i> Log out</button>'
    );
    $("#logoutNav").on("click", function (e) {
      e.preventDefault();

      Swal.fire({
        icon: "question",
        title: "ต้องการออกจากระบบใช่หรือไม่ ?",
        showCancelButton: true,
        confirmButtonText: `ใช่`,
        cancelButtonText: `ไม่`,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("session");
          Swal.fire(
            'ออกจากระบบแล้ว',
            '',
            'success'
          ).then(() => {
            window.location.href = "http://localhost:8080/home";
          })
        }
      });
    });
    $("#adminNav").attr("href", "/admin");
  }

  $.get("http://localhost:3001/api/history/pending/count", function (item) {
    count = JSON.stringify(item[0]).split(":")[1].replace("}", "");
    if (count == 0);
    else {
      $("#pCount").text(count);
    }
  });
});
