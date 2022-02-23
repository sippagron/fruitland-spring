$(document).ready(function () {

    let count = 0;

    const dateConvert = (date) => {
        return moment(date).format('DD/MM/YYYY - HH:mm:ss');
    }

    $('#historyList').DataTable({
        rowCallback: function (row, data, index) {
            if (data[1] == "IMPORT") {
                $(row).find('td:eq(1)')
                    .css('color', 'green')
                    .css('font-weight', 'bold');
            }
            else if (data[1] == "EXPORT") {
                $(row).find('td:eq(1)')
                    .css('color', 'red')
                    .css('font-weight', 'bold');
            }
            if (data[3] == "ACCEPT") {
                $(row).find('td:eq(3)')
                    .css('color', 'green')
            }
            else if (data[3] == "REJECT") {
                $(row).find('td:eq(3)')
                    .css('color', 'red')
            } else {
                $(row).find('td:eq(3)')
                    .css('color', '#ffc107')
            }
            $(row).find('td:eq(2)').text(dateConvert(data[2]));
        }, order: [[0, "desc"]]
    });

    $.get('http://localhost:3001/api/history/count/import', function (item) {
        count = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#ib').text(`นำเข้า ${count} รายการ`);
    });

    $.get('http://localhost:3001/api/history/count/export', function (item) {
        count = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#eb').text(`นำออก ${count} รายการ`);
    });

    $.get('http://localhost:3001/api/history/count', function (item) {
        pCount = JSON.stringify(item[0]).split(":")[1].replace("}", "")
        $('#historyNoti').text(`ประวัติการนำเข้า/นำออก ${pCount} รายการ`);
    });
})