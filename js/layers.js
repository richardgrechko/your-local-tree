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
    color: "#382e2e",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "a", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

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
    layerShown(){return true},
	automate() {
        	player.a.points = player.points.mul(player.b.points.add(1)).mul(player.c.points.add(1)).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
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
    color: "#584541",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "b", // Name of prestige currency
    baseResource: "a", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.c.points.add(1)).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
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
        description: "auto b",
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
    passiveGeneration() {
      return hasUpgrade("b", 11)
    },
	branches: ["c"],
    layerShown(){return true}
})

addLayer("c", {
    name: "c", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#7a5f52",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "c", // Name of prestige currency
    baseResource: "b", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "b",
        description: "auto c",
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
    passiveGeneration() {
      return hasUpgrade("c", 11)
    },
	branches: ["d"],
    layerShown(){return true}
})

addLayer("d", {
    name: "d", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "d", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a68059",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "d", // Name of prestige currency
    baseResource: "c", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "c",
        description: "auto d",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    passiveGeneration() {
      return hasUpgrade("d", 11)
    },
	branches: ["e"],
    layerShown(){return true}
})

addLayer("e", {
    name: "e", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "e", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ccaa66",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "e", // Name of prestige currency
    baseResource: "d", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "d",
        description: "auto e",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    passiveGeneration() {
      return hasUpgrade("e", 11)
    },
	branches: ["f"],
    layerShown(){return true}
})

addLayer("f", {
    name: "f", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "f", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#d6c25c",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "f", // Name of prestige currency
    baseResource: "e", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "e",
        description: "auto f",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    passiveGeneration() {
      return hasUpgrade("f", 11)
    },
	branches: ["g"],
    layerShown(){return true}
})

addLayer("g", {
    name: "g", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ebeb47",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "g", // Name of prestige currency
    baseResource: "f", // Name of resource prestige is based on
    baseAmount() {return player.f.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "f",
        description: "auto g",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    passiveGeneration() {
      return hasUpgrade("g", 11)
    },
	branches: ["h"],
    layerShown(){return true}
})

addLayer("h", {
    name: "h", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "h", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#aaff00",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "h", // Name of prestige currency
    baseResource: "g", // Name of resource prestige is based on
    baseAmount() {return player.g.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1).mul(player.d.points.add(1)).mul(player.e.points.add(1)).mul(player.f.points.add(1)).mul(player.g.points.add(1)).mul(player.h.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
	    11: {
        title: "g",
        description: "auto h",
        style: {
        	"height": "120px",
        	"width": "120px",
        	"border-top-left-radius": "25%",
        	"border-top-right-radius": "25%",
        	"border-bottom-left-radius": "25%",
        	"border-bottom-right-radius": "25%",
        },
        cost: new Decimal(100)
	    },
    },
    passiveGeneration() {
      return hasUpgrade("h", 11)
    },
    layerShown(){return true}
})
