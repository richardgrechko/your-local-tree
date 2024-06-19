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
        cost: new Decimal(100)
      },
      12: {
        title: "Even more RP",
        description: "x3 RP gain",
        cost: new Decimal(500)
      },
      13: {
        title: "Way more RP",
        description: "x5 RP gain",
        cost: new Decimal(10000)
      },
    },
	buyables: {
		11: {
            title: "Quickener",
            currencyDisplayName: "Number",
            currencyInternalName: "Number",
            style() {
                const style = {"width": "120px", "height": "120px"}
                return style
              },
            cost(x) { 
                let cost1 = new Decimal (10)
                cost = cost1.mul(Math.pow(1.1, x))
                if (x.lt(1)) {cost=10}
                return cost
                    },
            display() { // Everything else displayed in the buyable button after the title
                i = new Decimal(3)
                p = player.p.points
                rp = player.r.points
                if (player.r.points.gt(1e3)) {p=p.mul(rp.mul(0.05).add(1))}
                if ((player.r.unlocked)&&(player.r.points.lte(1e3))) {p=p.mul(rp.mul(0.1).add(1))}
                if (player.p.unlocked) {i=i.mul(p.mul(0.1).add(1))}
                if (hasMilestone("r", 0)) {i=i.mul(2)}
                i = Math.floor(i)
                let data = tmp.r.buyables[11]
                return "Cost: " + format(data.cost) + " Number\n\
                Level: " + player.r.buyables[this.id] + "\n\
                Adds +"+ format(i) + " NPS"
            },
            canAfford() {
                return player.points.gte(tmp[this.layer].buyables[this.id].cost)
                },
                buy() {
                    if (hasMilestone("r", 1)) {while (player.points.gte(tmp[this.layer].buyables[this.id].cost))
                    {
                        this.cost()
                        player.points = player.points.sub(cost)   
                        player.r.buyables[11] = player.r.buyables[11].add(1)
                        i = new Decimal(3)
                        playerNPoints=playerNPoints.add(i)
                    }}
                    else {
                        this.cost()
                        player.points = player.points.sub(cost)   
                        player.r.buyables[11] = player.r.buyables[11].add(1)
                        i = new Decimal(3)
                        playerNPoints=playerNPoints.add(i)
                    }
                },
                    effect (){
                    return player.r.points
                }
		}
	},
	branches: ["p"],
    passiveGeneration() {
      return hasMilestone("p", 0)
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
    color: "#0080FF",
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
