$(document).ready(function () {
    let pProduct = null; //select product
    let session = localStorage.getItem("session")

    //table
    $('#productList').DataTable({
        rowCallback: function (row, data, index) {
            if (parseInt(data[2]) < parseInt(data[3])) {
                $(row).find('td:eq(2)')
                    .css('color', 'red')
                    .css('font-weight', 'bold');
            }
            $(row).find('td:eq(2)').text(parseInt(data[2]).toLocaleString());
            $(row).find('td:eq(4)').text(parseFloat(data[4]).toLocaleString());
            $(row).find('td:eq(3)').text(parseInt(data[3]).toLocaleString());

            //add button
            $('.btn.btn-success').on('click', function (e) {
                e.preventDefault();
                let href = $(this).attr('href');
                $.get(href, function (product) {
                    pProduct = product;
                    $('#productName').text(product.name);
                    $('#productQuantity').text(`${product.quantity} ชิ้น`);
                    $('#productSafe').text(`safety stock : ${product.safetyStock}`);
                });
                $('#sQuantity').val("1");
                $('#errA').remove();
                $('#myModal').modal('show');
            });
        }
    });


    //export button (modal)
    $('#exportBtn').on('click', function (e) {
        e.preventDefault();
        let sq = $('#sQuantity').val(); //input quantity

        if (pProduct.quantity >= sq && sq != "" && sq > 0) {
            let data = { "quantity": pProduct.quantity - sq }

            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3001/api/products/' + pProduct.id,
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).done((res) => {
                if (res == 0) {
                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3001/api/products/' + pProduct.id,
                        contentType: 'application/json'
                    })
                }

                //need to focus this
                let cart = {
                    "name": pProduct.name, "quantity": sq, "price": pProduct.price,
                    "safetyStock": pProduct.safetyStock, "note": pProduct.note, "productId": pProduct.id
                }
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3001/api/cart/add/',
                    contentType: 'application/json',
                    data: JSON.stringify(cart)
                })
                window.location.href = 'http://localhost:8080/export/';
            });
        }
        else {
            $('#errA').remove();
            $('#modalBody').append(`<div class="alert alert-danger mt-3" role="alert" id="errA">กรุณาใส่จำนวนให้ถูกต้อง</div>`);
        }
    });

    $('#exportAllBtn').on('click', function (e) {
        e.preventDefault();

        $.get('http://localhost:3001/api/cart/', function (cart) {
            if (cart[0] === undefined) {
                Swal.fire(
                    'รายการนำออกว่าง',
                    '',
                    'error'
                )
            }
            else {
                let history;
                let msg = "";

                Swal.fire({
                    icon: "question",
                    title: "ต้องการนำออกผลไม้\nใช่หรือไม่ ?",
                    showCancelButton: true,
                    confirmButtonText: `ใช่`,
                    cancelButtonText: `ไม่`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (session === null) {
                            history = { "type": "EXPORT", "status": "PENDING", "note": "none" }
                            msg = "สร้างรายการแล้ว\nกรุณารอผู้ดูแลระบบทำการยืนยัน"
                        } else {
                            history = { "type": "EXPORT", "status": "ACCEPT", "note": "none" }
                            msg = "นำออกผลไม้แล้ว"
                        }
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3001/api/products/exportall/',
                            contentType: 'application/json',
                            data: JSON.stringify(history)
                        }).done((res) => {
                            Swal.fire({
                                icon: "success",
                                title: msg,
                                confirmButtonText: `ดูรายการ`,
                                showCancelButton: true,
                                cancelButtonText: `ตกลง`
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = "http://localhost:8080/history/";
                                } else {
                                    window.location.href = "http://localhost:8080/export/";
                                }
                            });
                        });
                    }
                });
            }
        });
    });

    //remove btn
    $('.table .btn.btn-danger').on('click', function (e) {
        e.preventDefault();
        let href = $(this).attr('href');
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3001/api/cart' + href,
            contentType: 'application/json'
        }).done((res) => {
            window.location.href = 'http://localhost:8080/export/';
        });
    });
});