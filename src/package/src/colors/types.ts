import colors from './index'
export type ColorType = 
"amber" | 
"blue" | 
"bluegrey" | 
"brown" | 
"cyan" | 
"deeporange" | 
"deeppurple" | 
"green" | 
"grey" | 
"indigo" | 
"lightblue" | 
"lightgreen" | 
"lime" |
"orange" |
"pink" |
"purple" |
"red" |
"teal" |
"yellow"

export function getHoverColor(colorType: ColorType, colorHue: string): string {
    const hue = parseInt(colorHue)
    if(isNaN(hue)) return colors[colorType][colorHue]
    const nextHue = hue + 200
    if(nextHue > 900) return colors[colorType][(hue - 200).toString()]
    return colors[colorType][nextHue.toString()]
}

export function getTextColor(colorType: ColorType, colorHue: string) : string {
    if(colorType === "amber") {
        return "black"
    }
    if(colorType === "blue") {
        if(colorHue.includes("a")) {
            if(colorHue === "a100") return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 500) return "white"
        return "black"
    }
    if(colorType === "bluegrey") {
        if(parseInt(colorHue) >= 400) return "white"
        return "black"
    }
    if(colorType === "brown") {
        if(parseInt(colorHue) >= 300) return "white"
        return "black"
    }
    if(colorType === "cyan") {
        if(colorHue.includes("a")) return "black"
        if(parseInt(colorHue) >= 700) return "white"
        return "black"
    }
    if(colorType === "deeporange") {
        if(colorHue.includes("a")) {
            if(["a100", "a200"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 500) return "white"
        return "black"
    }
    if(colorType === "deeppurple") {
        if(colorHue.includes("a")) {
            if(["a100"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 300) return "white"
        return "black"
    }
    if(colorType === "green") {
        if(colorHue.includes("a")) {
            return "black"
        }
        if(parseInt(colorHue) >= 600) return "white"
        return "black"
    }
    if(colorType === "grey") {
        if(parseInt(colorHue) >= 600) return "white"
        return "black"
    }
    if(colorType === "indigo") {
        if(colorHue.includes("a")) {
            if(["a100"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 300) return "white"
        return "black"
    }
    if(colorType === "lightblue") {
        if(colorHue.includes("a")) {
            if(["a100", "a200", "a400"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 600) return "white"
        return "black"
    }
    if(colorType === "lightgreen") {
        if(colorHue.includes("a")) {
            return "black"
        }
        if(parseInt(colorHue) >= 700) return "white"
        return "black"
    }
    if(colorType === "lime") {
        if(colorHue.includes("a")) {
            return "black"
        }
        if(parseInt(colorHue) >= 900) return "white"
        return "black"
    }
    if(colorType === "orange") {
        if(colorHue.includes("a")) {
            return "black"
        }
        if(parseInt(colorHue) >= 800) return "white"
        return "black"
    }
    if(colorType === "pink") {
        if(colorHue.includes("a")) {
            if(["a100"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 300) return "white"
        return "black"
    }
    if(colorType === "purple") {
        if(colorHue.includes("a")) {
            if(["a100"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 300) return "white"
        return "black"
    }
    if(colorType === "red") {
        if(colorHue.includes("a")) {
            if(["a100"].includes(colorHue)) return "black"
            return "white"
        }
        if(parseInt(colorHue) >= 400) return "white"
        return "black"
    }
    if(colorType === "teal") {
        if(colorHue.includes("a")) {
            return "black"
        }
        if(parseInt(colorHue) >= 400) return "white"
        return "black"
    }
    if(colorType === "yellow") {
        return "black"
    }
    return "black"
}
