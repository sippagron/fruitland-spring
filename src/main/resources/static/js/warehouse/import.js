$(document).ready(function () {
    let errType = "";
    let session = localStorage.getItem("session");

    function isEmpty(str) {
        return str.replace(/^\s+|\s+$/g, "").length == 0;
    }

    const isBelowZero = () => {
        let zero = false;
        if ($("#inputQuantity").val() <= 0) {
            errType = "จำนวนต้องมากกว่า 0";
            zero = true;
        }
        if ($("#inputSafetyStock").val() <= 0) {
            errType = "Safety Stock ต้องมากกว่า 0";
            zero = true;
        }
        if ($("#inputPrice").val() <= 0) {
            errType = "ราคาต้องมากกว่า 0";
            zero = true;
        }
        return zero;
    };

    $("#submitBtn").on("click", function (e) {
        e.preventDefault();

        if ($("#inputName").val() == "" || isEmpty($("#inputName").val())) {
            $("#errA").remove();
            $("#btn-container").append(
                `<div class="alert alert-danger mt-3" role="alert" id="errA">กรุณาใส่ชื่อสผลไม้</div>`
            );
        } else if (isBelowZero()) {
            $("#errA").remove();
            $("#btn-container").append(
                `<div class="alert alert-danger mt-3" role="alert" id="errA">${errType}</div>`
            );
        } else {
            let product;

            Swal.fire({
                icon: "question",
                title: "ต้องการนำเข้าผลไม้\nใช่หรือไม่ ?",
                showCancelButton: true,
                confirmButtonText: `ใช่`,
                cancelButtonText: `ไม่`,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (session === null) {
                        product = {
                            name: $("#inputName").val(),
                            quantity: $("#inputQuantity").val(),
                            price: $("#inputPrice").val(),
                            safetyStock: $("#inputSafetyStock").val(),
                            note: $("#inputNote").val(),
                            type: "IMPORT",
                            status: "PENDING",
                        };

                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3001/api/products/import/",
                            contentType: "application/json",
                            data: JSON.stringify(product),
                        }).done((res) => {
                            Swal.fire({
                                icon: "success",
                                title: "สร้างรายการแล้ว\nกรุณารอผู้ดูแลระบบทำการยืนยัน",
                                confirmButtonText: `ดูรายการ`,
                                showCancelButton: true,
                                cancelButtonText: `ตกลง`
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = "http://localhost:8080/history/";
                                } else {
                                    window.location.href = "http://localhost:8080/import/";
                                }
                            });
                        });
                    } else {
                        product = {
                            name: $("#inputName").val(),
                            quantity: $("#inputQuantity").val(),
                            price: $("#inputPrice").val(),
                            safetyStock: $("#inputSafetyStock").val(),
                            note: $("#inputNote").val(),
                            type: "IMPORT",
                            status: "ACCEPT",
                        };

                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3001/api/products/import/",
                            contentType: "application/json",
                            data: JSON.stringify(product),
                        }).done((res) => {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3001/api/products/add/",
                                contentType: "application/json",
                                data: JSON.stringify(product),
                            }).done((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "นำเข้าผลไม้แล้ว",
                                    confirmButtonText: `ดูรายการ`,
                                    showCancelButton: true,
                                    cancelButtonText: `ตกลง`
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = "http://localhost:8080/history/";
                                    } else {
                                        window.location.href = "http://localhost:8080/import/";
                                    }
                                });
                            });
                        });
                    }
                }
            });
        }
    });
});
