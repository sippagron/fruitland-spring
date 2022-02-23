$(document).ready(function () {

    let pCount = 0;
    let session = localStorage.getItem("session")

    if (session !== null) {
        let user = JSON.parse(localStorage.getItem('session'))
        $('#welcome').text(`${user.username}`);
    }

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
        }
    });

    $.get('http://localhost:3001/api/history/pending/count', function (item) {
        pCount = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#pNoti').text(`รอการยืนยัน ${pCount} รายการ`);
    });

    $.get('http://localhost:3001/api/products/count/ofs', function (item) {
        pCount = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#safeNoti').text(`ขาด Stock ${pCount} รายการ`);
    });

    $.get('http://localhost:3001/api/products/count', function (item) {
        pCount = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#productNoti').text(`สินค้าทั้งหมด ${pCount} รายการ`);
    });
});