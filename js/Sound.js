
export class Sound {
    constructor() {

        this.markedDeletion = false

    }

    lecture() {
        this.sound.play()
        this.markedDeletion = true
    }
}

export class SndBriqueImpact extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/brique_touche.mp3")
    
    }
  
}

export class SndBriqueCasse extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/brique_casse.mp3")
    
    }
  
}

export class SndBalleMur extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/impact_mur.mp3")
    
    }
  
}

export class SndBallePalette extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/impact_palette.mp3")
    
    }
  
}

export class SndBallOut extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/ball_out.mp3")
    
    }
  
}

export class SndLevelUp extends Sound {
    constructor() {
        super() 
        this.sound = new Audio("./sounds/level_up.mp3")
    
    }
  
}