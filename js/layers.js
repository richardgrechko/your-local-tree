const statLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  
  ]

function getStatName(n) {
  if (n.add == undefined) n = new Decimal(n)
  if (n.gte(1e100)) return `${formatWhole(n)}th stat`
  if (n.gte(26)) return getStatName(n.mod(26)) + "<sup>" + getStatName(n.div(26).floor().sub(1)) + "</sup>"
  return statLetters[n.floor()]
}
addLayer("a", {
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#80ff00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "a", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    mult = mult.mul(5)

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
        title: "bla",
        description: "x2 a gain",
        style: {
        	"height": "120px",
        	"width": "120px",
		"margin": 0,
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "0%",
        },
        cost: new Decimal(100)
      },
      12: {
        title: "bla",
        description: "x3 a gain",
        style: {
        	"height": "120px",
        	"width": "120px",
		"margin": 0,
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "0%",
        	"border-bottom-right-radius": "0%",
        },
        cost: new Decimal(500)
      },
      13: {
        title: "bla",
        description: "x5 a gain",
        style: {
        	"height": "120px",
        	"width": "120px",
		"margin": 0,
        	"border-top-left-radius": "0%",
        	"border-top-right-radius": "0%",
        	"border-bottom-left-radius": "0%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(10000)
      },
    },
	branches: ["b"],
	autoBuy() {
		return hasMilestone("b", 1)
	},
    softcap: new Decimal("ee10"),
    layerShown(){return true}
	automate() {
        	player.a.points = player.points.mul(player.b.points.add(1))
	},
})
addLayer("b", {
    name: "b", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "b", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#80ff00",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "b", // Name of prestige currency
    baseResource: "a", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
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
        title: "a",
        description: "a",
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
    },
    layerShown(){return false}
})
