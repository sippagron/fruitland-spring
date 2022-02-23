$(document).ready(function () {
    let session = localStorage.getItem("session")

    if (session === null) {
        window.location.href = 'http://localhost:8080/admin/login';
    }

    const dateConvert = (date) => {
        return `${moment(date).format('DD/MM/YYYY - HH:mm:ss')} (${moment(date).fromNow()})`;
    }

    $('#historyList').DataTable({
        rowCallback: function (row, data, index) {
            if (data[1] == "EXPORT") {
                $(row).find('td:eq(1)')
                    .css('color', 'red')
                    .css('font-weight', 'bold');
            } else {
                $(row).find('td:eq(1)')
                    .css('color', 'green')
                    .css('font-weight', 'bold');
            }
            $(row).find('td:eq(2)').text(dateConvert(data[2]));

            //accpet button
            $('.btn.btn-success').on('click', function (e) {
                e.preventDefault();

                let id = $(this).attr('href').split("/")[2];
                data = { "status": "ACCEPT" }

                Swal.fire({
                    icon: "question",
                    title: "ต้องการยืนยัน\nใช่หรือไม่ ?",
                    showCancelButton: true,
                    confirmButtonText: `ใช่`,
                    cancelButtonText: `ไม่`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.get('http://localhost:3001/api/history/' + id, function (history) {
                            if (history[0].type == "IMPORT") {
                                //do accept import
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://localhost:3001/api/products/import/accept/' + id,
                                    contentType: 'application/json',
                                    data: JSON.stringify(data)
                                }).done(() => {
                                    window.location.href = 'http://localhost:8080/admin';
                                })
                            }
                            else {
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:3001/api/history/update/' + id,
                                    contentType: 'application/json',
                                    data: JSON.stringify(data)
                                }).done(() => {
                                    window.location.href = 'http://localhost:8080/admin';
                                })
                            }
                        })
                    }
                });

            });

            //reject button
            $('.btn.btn-danger').on('click', function (e) {
                e.preventDefault();

                let id = $(this).attr('href').split("/")[2];
                data = { "status": "REJECT" }

                Swal.fire({
                    icon: "question",
                    title: "ต้องการปฏิเสธ\nใช่หรือไม่ ?",
                    showCancelButton: true,
                    confirmButtonText: `ใช่`,
                    cancelButtonText: `ไม่`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.get('http://localhost:3001/api/history/' + id, function (history) {
                            if (history[0].type == "IMPORT") {
                                $.ajax({
                                    type: 'PUT',
                                    url: 'http://localhost:3001/api/history/update/' + id,
                                    contentType: 'application/json',
                                    data: JSON.stringify(data)
                                }).done(() => {
                                    window.location.href = 'http://localhost:8080/admin';
                                })
                            }
                            else {
                                //do reject export
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://localhost:3001/api/products/export/reject/' + id,
                                    contentType: 'application/json',
                                    data: JSON.stringify(data)
                                }).done(() => {
                                    window.location.href = 'http://localhost:8080/admin';
                                })
                            }
                        })
                    }
                });
            });
        }
    });

})