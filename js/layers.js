addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#8000FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "seconds", // Name of resource prestige is based on
    baseAmount() {return player.points.mul(player.r.points.add(1))}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.9, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("r", 11)) mult = mult.mul(2)
        if (hasUpgrade("r", 12)) mult = mult.mul(3)
        if (hasUpgrade("r", 13)) mult = mult.mul(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
      11: {
        title: "More RP",
        description: "x2 RP gain",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "0%",
        },
        cost: new Decimal(100)
      },
      12: {
        title: "Even more RP",
        description: "x3 RP gain",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "0%",
        	"border-bottom-right-radius": "0%",
        },
        cost: new Decimal(500)
      },
      13: {
        title: "Way more RP",
        description: "x5 RP gain",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "0%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(10000)
      },
    },
	buyables: {
		11: {
            cost() {return new Decimal(10).mul(getBuyableAmount(this.layer, this.id).add(1))},
            display() {return "("+formatWhole(getBuyableAmount(this.layer, this.id).add(tmp['r'].buyables[11].bonus))+"/"+formatWhole(new Decimal(100).add(tmp['r'].buyables[11].bonus))+")<br><h3>Quickener</h3><br>+10% points<br>Cost: "+format(this.cost())+" bytes<br>Currently: "+format(buyableEffect(this.layer, this.id))+"x"},
            effect() {return new Decimal(1).add(new Decimal(0.1).mul(getBuyableAmount(this.layer, this.id).add(tmp['r'].buyables[11].bonus))).mul(buyableEffect('r', 12))},
            canAfford() {return player.r.points.gte(this.cost())},
            buy() {
                if(!hasMilestone('unl', 1)){player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))} else {
                setBuyableAmount(this.layer, this.id, player.b.points.min(100).floor())}
            },
            style: {
                "height": "120px",
                "width": "120px",
                "border-top-left-radius": "25%",
                "border-top-right-radius": "0%",
                "border-bottom-left-radius": "0%",
                "border-bottom-right-radius": "0%",
            },
            purchaseLimit: 100,
            bonus() {
                let bonus = new Decimal(0)
                if(hasUpgrade('p', 11)) bonus = bonus.add(upgradeEffect('p', 11))
                return bonus
            },
		},
		12: {
            cost() {return new Decimal(100).mul(new Decimal(1.12).pow(x || getBuyableAmount(this.layer, this.id)))},
            display() {return "("+formatWhole(getBuyableAmount(this.layer, this.id).add(tmp['r'].buyables[11].bonus))+"/"+formatWhole(new Decimal(100).add(tmp['r'].buyables[11].bonus))+")<br><h3>Fastener</h3><br>+10% points<br>Cost: "+format(this.cost())+" bytes<br>Currently: "+format(buyableEffect(this.layer, this.id))+"x"},
            effect() {return new Decimal(5).add(new Decimal(0.5).mul(getBuyableAmount(this.layer, this.id).add(tmp['r'].buyables[11].bonus))).mul(buyableEffect('r', 12))},
            canAfford() {return player.r.points.gte(this.cost())},
            buy() {
                if(!hasMilestone('unl', 1)){player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))} else {
                setBuyableAmount(this.layer, this.id, player.b.points.min(100).floor())}
            },
            style: {
                "height": "120px",
                "width": "120px",
                "border-top-left-radius": "0%",
                "border-top-right-radius": "0%",
                "border-bottom-left-radius": "0%",
                "border-bottom-right-radius": "0%",
            },
            purchaseLimit: 10000,
            bonus() {
                let bonus = new Decimal(0)
                if(hasUpgrade('a', 12)) bonus = bonus.add(upgradeEffect('a', 12))
                return bonus
            },
		},
	},
	branches: ["p", "a"],
    passiveGeneration() {
      return hasMilestone("p", 0)
    },
	autoBuy() {
		return hasMilestone("p", 1)
	},
    softcap: new Decimal("ee10"),
    layerShown(){return true}
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0080FF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "RP", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
      0: {
        requirementDescription: "100 prestige points",
        effectDescription: "Automate RP Upgrade and Get RP per second",
        done() {
          return player.p.points.gte(100)
        }
      },
      
    },
    layerShown(){return true}
})

addLayer("a", {
    name: "ascend", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF80",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "ascension points", // Name of prestige currency
    baseResource: "PP", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "Quickener Bonus",
        description: "just a bonus right?",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "0%",
        },
        cost: new Decimal(100)
	    },
	    12: {
        title: "Fastener Bonus",
        description: "just a bonus right?",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "0%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    layerShown(){return true}
})
