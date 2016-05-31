Decimal.config({ precision: 9 })
GeldPS = Decimal(1);
ABasPreis = Decimal(10);
BBasPreis = Decimal(300);
CBasPreis = Decimal(60000);
ExABasPreis = Decimal(200000000);
var GeldTxt;
var GeldPSTxt;
var ATxt;
var BTxt;
var CTxt;
var ExATxt;
var APreisTxt;
var BPreisTxt;
var CPreisTxt;
var ExAPreisTxt;
GeldTxt = document.getElementById("Geld");
GeldPSTxt = document.getElementById("GeldPS");
ATxt = document.getElementById("A");
BTxt = document.getElementById("B");
CTxt = document.getElementById("C");
ExATxt = document.getElementById("ExA");
APreisTxt = document.getElementById("APreisAnz");
BPreisTxt = document.getElementById("BPreisAnz");
CPreisTxt = document.getElementById("CPreisAnz");
ExAPreisTxt = document.getElementById("ExAPreisAnz");
MaxKaufTxt = document.getElementById("BuyMaxKno");
KaufModusBTxt = document.getElementById("BMulti/MaxKno");
FPS = 30;
PreisErhA = 1.205;
PreisErhB = 9.9
PreisErhC = 13.99
PreisErhExA = 866.66
var Sp = {
Geld : Decimal(1),
A : Decimal(1),
B : Decimal(1),
C : Decimal(1),
ExA :Decimal(1),
APreis : Decimal(ABasPreis),
BPreis : Decimal(BBasPreis),
CPreis : Decimal(CBasPreis),
ExAPreis : Decimal(ExABasPreis),
lastUpdate: new Date().getTime(),
BKaufAnz : Decimal(0),
CKaufAnz : Decimal(0),
ExAKaufAnz : Decimal(0)
}
MultiPreis = Decimal(0)
MultiKaufAnzahl = Decimal(1)
KaufModusA = false;
KaufModusB = false;
Spielstand = 'LIdleS';
BKaufAnzTxt = document.getElementById("BKaufAnzAnz")
CKaufAnzTxt = document.getElementById("CKaufAnzAnz")
ExAKaufAnzTxt = document.getElementById("ExAKaufAnzAnz")
MaxKaufAnz = Decimal(1);

function BilTxtAkt ()
	{
	GeldTxt.textContent = Sp.Geld.toPrecision(3);
	GeldPSTxt.textContent = GeldPS.toPrecision(3);
	ATxt.textContent = Sp.A.toPrecision(3);
	BTxt.textContent = Sp.B.toPrecision(3);
	CTxt.textContent = Sp.C.toPrecision(3)
	ExATxt.textContent = Sp.ExA.toPrecision(3);
	APreisTxt.textContent = MultiPreis.toPrecision(3);
	BPreisTxt.textContent = Sp.BPreis.toPrecision(3);
	CPreisTxt.textContent = Sp.CPreis.toPrecision(3);
	ExAPreisTxt.textContent = Sp.ExAPreis.toPrecision(3);
	MaxKaufTxt.textContent = SchaltStatus(KaufModusA)
	KaufModusBTxt.textContent = SchaltStatus(KaufModusB)
	BKaufAnzTxt.textContent = Sp.BKaufAnz.toPrecision(6);
	CKaufAnzTxt.textContent = Sp.CKaufAnz.toPrecision(6);
	ExAKaufAnzTxt.textContent = Sp.ExAKaufAnz.toPrecision(6);
	}
	
function Rechnen () {
	GeldPS = Decimal.pow(Decimal.mul(Sp.A, Decimal.mul(Sp.B,Sp.C)), Sp.ExA)
}


function ProFrame (modi) {
	modi = modi || 1
	Sp.Geld = Sp.Geld.add(Decimal.mul((GeldPS.div(FPS)) , modi))
	BilTxtAkt()
}

function MKaufPrRchFormK(Zahl) {
return	MultiPreis = Sp.APreis.mul(Decimal.div(Decimal.sub(Decimal.pow(PreisErhA, Zahl), 1), (PreisErhA - 1)));
}

function MKaufPrRch() {
	MultiPreis = Decimal(0)
	if (KaufModusA == false) {
		if (MultiKaufAnzahl.gte(1)) {
			MultiPreis = MKaufPrRchFormK(MultiKaufAnzahl);
			
		} else {
		MultiPreis = Sp.APreis
		}
	} 
	else {
		if (MaxKaufAnz.gte(1))
			MultiPreis = MKaufPrRchFormK(MaxKaufAnz);
		else
		MultiPreis = Sp.APreis
	}
	//for (i = Decimal(0);(MultiKaufAnzahl.gt(i));i=i.add(1)){
		//MultiPreis = MultiPreis.add(Sp.APreis.mul(Decimal.pow(PreisErhA, i)))
//}
}


function AKauf () {
	if (Sp.Geld.gte(MultiPreis)) {
		Sp.Geld = Sp.Geld.sub(MultiPreis)
		if (KaufModusA == false) {
			Sp.APreis = Sp.APreis.mul(Decimal.pow(PreisErhA,MultiKaufAnzahl))
			Sp.A = Sp.A.add(MultiKaufAnzahl)
		}
		else {
			Sp.APreis = Sp.APreis.mul(Decimal.pow(PreisErhA,MaxKaufAnz))
			Sp.A = Sp.A.add(MaxKaufAnz)
		}
		
		Rechnen()
		MKaufPrRch()
	}
}
function SetMultiKaufAnzahl(){
	
	Eing= prompt("Type in the numeber of A that you want to buy at once use the format already in the textbox or simply write numbers",MultiKaufAnzahl.toExponential(3));
	if (Eing != null) {
		MultiKaufAnzahl = Decimal(Eing)
		MKaufPrRch()
	}
}

function MaxAKauf () {
	MaxAKaufMengeBestimmen()
	AKauf()
	MaxAKaufMengeBestimmen()
}

function ModusAendern (Variable) {
	if (window[Variable] == false) {
		window[Variable] = true
	}
	else {
		window[Variable] = false;
	}
	BilTxtAkt()
}

function AKaufen() {
	if (KaufModusA == true) {
		MaxAKauf ()
	}
	else {
		AKauf()
	}
}
function BKauf () {
	//if (BMultiMaxKauf == true) {
		//for (i = Decimal(0);(MultiKaufAnzahl.gt(i));i=i.add(1)) {
			//MaxAKauf()
		
			//if (Sp.Geld.gte(Sp.BPreis)) {
			
				//Sp.Geld = Sp.Geld.sub(Sp.BPreis)
				//Sp.BPreis = Sp.BPreis.mul(PreisErhB)
				//Sp.B = Sp.B.add(Sp.A)
				//Sp.A = Decimal(1)
				//Sp.APreis = ABasPreis
				//Rechnen()
				//MKaufPrRch()
			//}
		
		//}
	//} 
	//else {
		
		if (Sp.Geld.gte(Sp.BPreis)) {
			Sp.Geld = Sp.Geld.sub(Sp.BPreis)
			Sp.BPreis = Sp.BPreis.mul(PreisErhB)
			Sp.B = Sp.B.add(Sp.A)
			Sp.A = Decimal(1)
			Sp.APreis = ABasPreis
			Rechnen()
			MKaufPrRch()
			Sp.BKaufAnz = Sp.BKaufAnz.add(1)
		}	
	//}
}
function BMaxKauf () {
	while (Sp.Geld.gte(Sp.BPreis)) {
		MaxAKauf()
		BKauf()
	}
}

function BKaufen() {
	if (KaufModusB == true) {
		BMaxKauf ()
	}
	else {
		BKauf()
	}
}

function CKauf () {
	
	if (Sp.Geld.gte(Sp.CPreis)) {
		
		Sp.Geld = Sp.Geld.sub(Sp.CPreis)
		Sp.CPreis = Sp.CPreis.mul(PreisErhC)
		Sp.C = Sp.C.add(Sp.B)
		Sp.A = Decimal(1)
		Sp.B = Decimal(1)
		Sp.APreis = ABasPreis
		Sp.BPreis = BBasPreis
		Rechnen()
		MKaufPrRch()
		Sp.CKaufAnz = Sp.CKaufAnz.add(1)
		Sp.BKaufAnz = Decimal(0)
	}
}

function ExAKauf () {
	
	if (Sp.Geld.gte(Sp.ExAPreis)) {
		
		Sp.Geld = Decimal(10)
		Sp.ExAPreis = Sp.ExAPreis.mul(PreisErhExA)
		Sp.ExA = Sp.ExA.add(Sp.C.div(10000))
		Sp.A = Decimal(1)
		Sp.B = Decimal(1)
		Sp.C = Decimal(1)
		Sp.APreis = ABasPreis
		Sp.BPreis = BBasPreis
		Sp.CPreis = CBasPreis
		Rechnen()
		MKaufPrRch()
		Sp.ExAKaufAnz = Sp.ExAKaufAnz.add(1)
		Sp.BKaufAnz = Decimal(0)
		Sp.CKaufAnz = Decimal(0)
	}
}
function SchaltStatus(Variable) {
	if (Variable == true) {
		return "On"
	}
	else {
		return "Off"
	}
}

function MaxAKaufMengeBestimmen() {
		if (Sp.APreis.gt(Sp.Geld)) {
			MaxKaufAnz = Decimal(1);
        }
		else {
			//var result = Decimal.log(Decimal.div(Decimal.div(Sp.Geld.mul(Decimal.add(1,PreisErhA - 1)) , Sp.APreis) , Decimal.log(PreisErhA)));
			var result = Decimal.div(Decimal.log(Decimal.add(1,Decimal.div(Decimal.mul((PreisErhA - 1) , Sp.Geld) , Sp.APreis))) , Decimal.log(PreisErhA));
			// cast the result to an int
			MaxKaufAnz = Decimal.round(result.floor())
			MKaufPrRch()
		}
    }

