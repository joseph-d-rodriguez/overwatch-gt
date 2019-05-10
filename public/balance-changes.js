function buildBalanceChangeHero(firebaseHeroDoc) {
	let doc = firebaseHeroDoc.data(), h = { id: firebaseHeroDoc.id };
	h.changes = doc.changes;
	h.description = doc.description;
	return h;
}

function addBalanceChange(hero) {
	var balanceChangesUL = document.getElementsByClassName("balance-changes")[0];
	var heroLI = document.createElement("li");
	heroLI.appendChild(document.createTextNode(hero.id));
	var heroChangesUL = document.createElement("ul");
	if (hero.changes) {
		hero.changes.forEach(change => {
			var changeLI = document.createElement("li");
			changeLI.appendChild(document.createTextNode(change.description));
			heroChangesUL.appendChild(changeLI);
		});
		heroLI.appendChild(heroChangesUL);
	}
	balanceChangesUL.appendChild(heroLI);
	document.heroes[hero.id] = heroLI;
}

function addChanges(firebaseHeroDoc) {
	console.log('addChanges: firebaseHeroDoc: ', firebaseHeroDoc.id, firebaseHeroDoc.data());
	addBalanceChange(buildBalanceChangeHero(firebaseHeroDoc));
}


function listenForBalanceChanges() {
	document.heroes = {};

	var db = firebase.firestore();

	db.collection("heroes")
		.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(function(change) {
				if (change.type === "added") {
					console.log("New Hero: ", change.doc.id);
					addChanges(change.doc);
				}
				if (change.type === "modified") {
					console.log("Modified Hero: ", change.doc.id);
				}
				if (change.type === "removed") {
					console.log("Removed Hero: ", change.doc.id);
				}
			});
		});
}




