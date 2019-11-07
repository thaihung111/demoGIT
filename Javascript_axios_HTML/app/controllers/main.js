var nguoiDungService = new NguoiDungService();

getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function(){
    var title = "Them Nguoi Dung";
    var footer = `
        <button class="btn btn-success" onclick="themNguoiDung()">Them</button>
    `
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})


function themNguoiDung(){
    var taiKhoan = getEle("TaiKhoan").value;
    var matKhau = getEle("MatKhau").value;
    var hoTen = getEle("HoTen").value
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);

    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function(result){
            console.log(result);
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        })
}

function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
        //neu nhu axios lay duoc thong tin thi` se co LOI HUA la .then()
        .then(function(result){
            // console.log(result.data);
            // this.mangNguoiDung = result.data;
            renderTable(result.data);
            setLocalStorage(result.data);
        })
        //neu nhu khong duoc thi se la .catch()
        .catch(function(error){
            console.log(error);
        })
}
//Luu mangNguoiDung xuong local storage
function setLocalStorage(mangNguoiDung){
    localStorage.setItem("DanhSachNguoiDung", JSON.stringify(mangNguoiDung));
}
//Lay mang nguoi dung len
function getLocalStorage(){
    if(localStorage.getItem("DanhSachNguoiDung")){
        return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    }
}

//chuc nang tim kiem
getEle("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getEle("txtSearch").value;
    var mangNguoiDung = getLocalStorage();
    // console.log(mangNguoiDung);
    var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, mangNguoiDung);
    renderTable(mangTimKiem);
})

function getEle(id){
    return document.getElementById(id);
}

function renderTable(mangNguoiDung){
    var content = '';
    mangNguoiDung.map(function(item, index){
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="sua(${item.id})">Sua</button>
                    <button class="btn btn-danger" onclick="xoa(${item.id})">Xoa</button>
                </td>
            </tr>
        `
    })
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}
//Chuc nang xoa
function xoa(id){
    // console.log(id);
    nguoiDungService.xoaNguoiDung(id)
        .then(function(result){
            // console.log(result);
            getListUser();
        })
        .catch(function(error){
            console.log(error);
            // if(error.response.status === 404){
            //     alert("ma nguoi dung sai");
            // }
        })
}
//Chuc nang sua
function sua(id){
    // console.log(id);
    var title = "Sua nguoi dung";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    var footer = `
        <button class="btn btn-success" onclick="suaThongTin(${id})">Cap nhat</button>
    `
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinNguoiDung(id)
        .then(function(result){
            console.log(result);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("TaiKhoan").setAttribute("disabled", true);
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function(error){
            console.log(error);
        })
}
function suaThongTin(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var matKhau = getEle("MatKhau").value;
    var hoTen = getEle("HoTen").value
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    console.log(nguoiDung);

    nguoiDungService.capNhatNguoiDung(id, nguoiDung)
        .then(function(result){
            // console.log(result);
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        })
}
