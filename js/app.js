function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            startAnimation: false,
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            healNumber : 2,
            winner: false
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0)
            {
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if(this.playerHealth < 0)
            {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3;
        },
        mayUseHeal(){
            if(this.healNumber > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                // A draw
                this.winner = 'draw';
                this.startAnimation = false;
            }
            else if(value <= 0)
            {
                // Player Lost
                this.winner = 'monster';
                this.startAnimation = false;
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                // A draw
                this.winner = 'draw';
                this.startAnimation = false;
            }
            else if(value <= 0)
            {
                // Monster Lost
                this.winner = 'player';
                this.startAnimation = false;
            }
        }
    },
    methods: {
        attackMonster(){
            this.startAnimation = true;
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth-=attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue =getRandomValue(8, 15);
            this.playerHealth-=attackValue;
        },
        specialAttackMonster(){
            this.startAnimation = true;
            this.currentRound++;
            const attackValue = getRandomValue(8,20);
            this.monsterHealth-=attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.startAnimation = true;
            this.currentRound++;
            const healValue = getRandomValue(8,25);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else
            {
                this.playerHealth+=healValue;
            }
            this.attackPlayer();
            this.healNumber--;
        },
        startGame(){
            this.startAnimation = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.healNumber = 3;
            this.winner = false;
        },
        surrender(){
            this.winner = 'monster';
            this.startAnimation = false;
        }
    },
    
});

app.mount('#game');