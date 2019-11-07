function NguoiDungService(){
    // this.mangNguoiDung = [];

    this.themNguoiDung = function(nguoiDung){
        return axios({
            method: "POST",
            url: "http://5dbacb9f3ec5fb00143193ec.mockapi.io/api/NguoiDung",
            data: nguoiDung
        })
    }

    /*
        *** GIAO THUC ****
        * 4 giao thuc dung de tuong tac len server
        GET: lay dsng ve
        POST: them nguoi dung len server
        PUT: cap nhat nguoi dung
        DELETE: xoa nguoi dung
    */
    this.layDanhSachNguoiDung = function(){
        //trong axios co mot cai object gom co key va value
        return axios({
            method: "GET",
            url: "http://5dbacb9f3ec5fb00143193ec.mockapi.io/api/NguoiDung"
        })
    }

    this.xoaNguoiDung = function(id){
        return axios({
            method: "DELETE",
            url: `http://5dbacb9f3ec5fb00143193ec.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.layThongTinNguoiDung = function(id){
        return axios({
            method: "GET",
            url: `http://5dbacb9f3ec5fb00143193ec.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.capNhatNguoiDung = function(id, nguoiDung){
        return axios({
            method: "PUT",
            url: `http://5dbacb9f3ec5fb00143193ec.mockapi.io/api/NguoiDung/${id}`,
            data: nguoiDung
        })
    }
    this.timKiemNguoiDung = function(chuoiTimKiem, mangNguoiDung){
        /*
            1. tao mang rong mangTimKiem
            2. duyet mangNguoiDung
            3. sd ham indexOf so sanh
            4. them nguoi dung tim thay vao mang mangTimKiem
        */
    // Cach 1:
    //    var mangTimKiem = [];
    //    mangNguoiDung.map(function(item){
    //        if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1){
    //         mangTimKiem.push(item);
    //        }
    //    })
    //    return mangTimKiem;

    // Cach 2: dung filter
    return mangNguoiDung.filter(function(item){
        return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1
    })
    }
}
/* 3 Cach xu ly bat dong bo JS

 * 1. Callback function
 * 2. Promise
 * 3. Async await
 */
