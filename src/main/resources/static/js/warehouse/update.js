$(document).ready(function () {
    let pProduct = null; //select product
    let session = localStorage.getItem("session")

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

            //update btn
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

    $('#updateBtn').on('click', function (e) {
        e.preventDefault();
        let sq = $('#sQuantity').val(); //input quantity

        if (sq != "" && sq > 0) {
            let product;

            Swal.fire({
                icon: "question",
                title: "ต้องการอัพเดทจำนวนผลไม้\nใช่หรือไม่ ?",
                showCancelButton: true,
                confirmButtonText: `ใช่`,
                cancelButtonText: `ไม่`,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (session === null) {
                        product = {
                            "name": pProduct.name, "quantity": sq, "price": pProduct.price,
                            "safetyStock": pProduct.safetyStock, "note": pProduct.note, "productId": pProduct.id,
                            "type": "IMPORT", "status": "PENDING"
                        }

                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3001/api/products/import/',
                            contentType: 'application/json',
                            data: JSON.stringify(product)
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
                                    window.location.href = "http://localhost:8080/update/";
                                }
                            });
                        });
                    }
                    else {
                        product = {
                            "name": pProduct.name, "quantity": sq, "price": pProduct.price,
                            "safetyStock": pProduct.safetyStock, "note": pProduct.note, "productId": pProduct.id,
                            "type": "IMPORT", "status": "ACCEPT"
                        }

                        let uQuantity = { "quantity": pProduct.quantity + parseInt(sq) }

                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3001/api/products/import/',
                            contentType: 'application/json',
                            data: JSON.stringify(product)
                        }).done((res) => {
                            $.ajax({
                                type: 'PUT',
                                url: 'http://localhost:3001/api/products/' + pProduct.id,
                                contentType: 'application/json',
                                data: JSON.stringify(uQuantity)
                            }).done((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "อัพเดทจำนวนผลไม้แล้ว",
                                    confirmButtonText: `ดูรายการ`,
                                    showCancelButton: true,
                                    cancelButtonText: `ตกลง`
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = "http://localhost:8080/history/";
                                    } else {
                                        window.location.href = "http://localhost:8080/update/";
                                    }
                                });
                            })
                        });
                    }
                }
            });
        }
        else {
            $('#errA').remove();
            $('#modalBody').append(`<div class="alert alert-danger mt-3" role="alert" id="errA">กรุณาใส่จำนวนให้ถูกต้อง</div>`);
        }
    })

});