$(function(){
	$('#proses').click(function(){
		var jarak = $('#jarak').val();
		var ukuran = $('#ukuran').val();
		var alfa = new Array(18);
		var z = new Array(18);
		var fasilitas = 0;

		$('input:checked').each(function(){
    		fasilitas +=  parseFloat($(this).val());
		});

		fasilitas = fasilitas;	

    	$('#hasil').val("Rp "+prediksiHarga()+".000,00");	

    	//untuk menampilkan tabel alfa dan z setiap aturan
    	var z_result = "";
		for(i = 0; i < z.length; i++){
			z_result += "<tr><td>"+(i+1)+"</td><td>alfa</td><td>"+alfa[i]+"</td><td>z</td><td>"+z[i] + "</td><tr/>";
		}
		$('#z-result').html(z_result);
	
	/**
	*  mencari nilai minimum dari tiga variable
	*  @param x
	*  @param y
	*  @param z
	*  @return nilai minimum
	*/
	function findMin(x, y, z){
		if(x <= y && x <= z){
			return x;
		}else if(y <= x && y <= z){
			return y;
		}else{
			return z;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan fasilitas biasa
	*  @return nilai keanggotaan di himpunan fasilitas biasa
	*/
	function fasilitasBiasa(){
		if(fasilitas <= 20){
			return 1;
		}else if(fasilitas > 20 && fasilitas < 70){
			return (70 - fasilitas) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan fasilitas lengkap
	*  @return nilai keanggotaan di himpunan fasilitas lengkap
	*/
	function fasilitasLengkap(){
		if(fasilitas >= 70){
			return 1;
		}else if(fasilitas > 20 && fasilitas < 70){
			return (fasilitas - 20) / 50;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan jarak dekat
	*  @return nilai keanggotaan di himpunan jarak dekat
	*/
	function jarakDekat(){
		if(jarak <= 1){
			return 1;
		}else if(jarak > 1 && jarak < 3){
			return (3 - jarak) / 2;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan jarak sedang
	*  @return nilai keanggotaan di himpunan jarak sedang
	*/
	function jarakSedang(){
		if(jarak >= 3 && jarak <= 5){
			return 1;
		}else if(jarak > 1 && jarak < 3){
			return (jarak - 1) / 2;
		}else if(jarak > 5 && jarak < 7){
			return (7 - jarak) / 2;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan jarak jauh
	*  @return nilai keanggotaan di himpunan jarak jauh
	*/
	function jarakJauh(){
		if(jarak >= 7){
			return 1;
		}else if(jarak > 5 && jarak < 7){
			return (jarak - 5) / 2;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan ukuran sempit
	*  @return nilai keanggotaan di himpunan ukuran sempit
	*/
	function ukuranSempit(){
		if(ukuran <= 4){
			return 1;
		}else if(ukuran > 4 && ukuran < 8){
			return (8 - ukuran) / 4;
		}else{
			return 0;
		}
	}

	/**
	*  mencari nilai keanggotaan himpunan ukuran sedang
	*  @return nilai keanggotaan di himpunan ukuran sedang
	*/
	function ukuranSedang(){
		if(ukuran >= 8 && ukuran <= 15){
			return 1;
		}else if(ukuran > 4 && ukuran < 8){
			return (ukuran - 4) / 4;
		}else if(ukuran > 15 && ukuran < 18){
			return (18 - ukuran) / 3;
		}else{
			return 0;
		}
	}


	/**
	*  mencari nilai keanggotaan himpunan ukuran luas
	*  @return nilai keanggotaan di himpunan ukuran luas
	*/
	function ukuranLuas(){
		if(ukuran >= 18){
			return 1;
		}else if(ukuran > 15 && ukuran < 18){
			return (ukuran - 15) / 3;
		}else{
			return 0;
		}
	}


	/**
	*  mencari harga di himpunan harga murah
	*  @param alfa
	*  @return harga
	*/
	function hargaMurah(alfa){
		if(alfa > 0 && alfa < 1){
			return (900 - alfa * 600);
		}else if(alfa == 1){
			return 300;
		}else{
			return 900;
		}
	}

	/**
	*  mencari harga di himpunan harga mahal
	*  @param alfa
	*  @return harga
	*/
	function hargaMahal(alfa){
		if(alfa > 0 && alfa < 1){
			return (300 + alfa * 600);
		}else if(alfa == 1){
			return 900;
		}else{
			return 300;
		}
	}
	
	/**
	*  mencari nilai z untuk semua aturan yang ada
	*/
	function aturan(){
		//1. Jika fasilitas BIASA dan ukuran SEMPIT dan jarak DEKAT maka harga MAHAL
		alfa[0]	= findMin(fasilitasBiasa(),ukuranSempit(),jarakDekat());
		z[0] = hargaMahal(alfa[0]);
		//2. Jika fasilitas BIASA dan ukuran SEMPIT dan jarak SEDANG maka harga MURAH
		alfa[1]	= findMin(fasilitasBiasa(),ukuranSempit(),jarakSedang());
		z[1] = hargaMurah(alfa[1]);
		//3. Jika fasilitas BIASA dan ukuran SEMPIT dan jarak JAUH maka harga MURAH
		alfa[2]	= findMin(fasilitasBiasa(),ukuranSempit(),jarakJauh());
		z[2] = hargaMurah(alfa[2]);
		//4. Jika fasilitas BIASA dan ukuran SEDANG dan jarak DEKAT maka harga MAHAL
		alfa[3]	= findMin(fasilitasBiasa(),ukuranSedang(),jarakDekat());
		z[3] = hargaMahal(alfa[3]);
		//5. Jika fasilitas BIASA dan ukuran SEDANG dan jarak SEDANG maka harga MURAH
		alfa[4]	= findMin(fasilitasBiasa(),ukuranSedang(),jarakSedang());
		z[4] = hargaMurah(alfa[4]);
		//6. Jika fasilitas BIASA dan ukuran SEDANG dan jarak JAUH maka harga MURAH
		alfa[5]	= findMin(fasilitasBiasa(),ukuranSedang(),jarakJauh());
		z[5] = hargaMurah(alfa[5]);
		//7. Jika fasilitas BIASA dan ukuran LUAS dan jarak DEKAT maka harga MAHAL
		alfa[6]	= findMin(fasilitasBiasa(),ukuranLuas(),jarakDekat());
		z[6] = hargaMahal(alfa[6]);
		//8. Jika fasilitas BIASA dan ukuran LUAS dan jarak SEDANG maka harga MURAH
		alfa[7]	= findMin(fasilitasBiasa(),ukuranLuas(),jarakSedang());
		z[7] = hargaMurah(alfa[7]);
		//9. Jika fasilitas BIASA dan ukuran LUAS dan jarak JAUH maka harga MURAH
		alfa[8]	= findMin(fasilitasBiasa(),ukuranLuas(),jarakJauh());
		z[8] = hargaMurah(alfa[8]);
		//10. Jika fasilitas LENGKAP dan ukuran SEMPIT dan jarak DEKAT maka harga MAHAL
		alfa[9] = findMin(fasilitasLengkap(),ukuranSempit(),jarakDekat());
		z[9] = hargaMahal(alfa[9]);
		//11. Jika fasilitas LENGKAP dan ukuran SEMPIT dan jarak SEDANG maka harga MAHAL
		alfa[10] = findMin(fasilitasLengkap(),ukuranSempit(),jarakSedang());
		z[10] = hargaMahal(alfa[10]);
		//12. Jika fasilitas LENGKAP dan ukuran SEMPIT dan jarak JAUH maka harga MURAH
		alfa[11] = findMin(fasilitasLengkap(),ukuranSempit(),jarakJauh());
		z[11] = hargaMurah(alfa[11]);
		//13. Jika fasilitas LENGKAP dan ukuran SEDANG dan jarak DEKAT maka harga MAHAL
		alfa[12] = findMin(fasilitasLengkap(),ukuranSedang(),jarakDekat());
		z[12] = hargaMahal(alfa[12]);
		//14. Jika fasilitas LENGKAP dan ukuran SEDANG dan jarak SEDANG maka harga MAHAL
		alfa[13] = findMin(fasilitasLengkap(),ukuranSedang(),jarakSedang());
		z[13] = hargaMahal(alfa[13]);
		//15. Jika fasilitas LENGKAP dan ukuran SEDANG dan jarak JAUH maka harga MURAH
		alfa[14] = findMin(fasilitasLengkap(),ukuranSedang(),jarakJauh());
		z[14] = hargaMurah(alfa[14]);
		//16. Jika fasilitas LENGKAP dan ukuran LUAS dan jarak DEKAT maka harga MAHAL
		alfa[15] = findMin(fasilitasLengkap(),ukuranLuas(),jarakDekat());
		z[15] = hargaMahal(alfa[15]);
		//17. Jika fasilitas LENGKAP dan ukuran LUAS dan jarak SEDANG maka harga MAHAL
		alfa[16] = findMin(fasilitasLengkap(),ukuranLuas(),jarakSedang());
		z[16] = hargaMahal(alfa[16]);
		//18. Jika fasilitas LENGKAP dan ukuran LUAS dan jarak JAUH maka harga MURAH
		alfa[17] = findMin(fasilitasLengkap(),ukuranLuas(),jarakJauh());
		z[17] = hargaMurah(alfa[17]);
	}
	
	/**
	*  mencari nilai total z(defuzzyfikasi)
	*  @return nilai total z
	*/
	function defuzzyfikasi(){
		var temp1 = 0;
		var temp2 = 0;
		var hasil = 0;

		for(i = 0; i < 18; i++){
			temp1 = temp1 + alfa[i] * z[i];
			temp2 = temp2 + alfa[i];
		}

		hasil = temp1 / temp2;
		return Math.round(hasil);
	}
	
	/**
	*  menghitung semua aturan dan menentukan harga
	*  @return harga
	*/
	function prediksiHarga(){
		aturan();
		return defuzzyfikasi();
	}

	});
});