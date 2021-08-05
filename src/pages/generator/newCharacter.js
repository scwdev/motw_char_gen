import React from 'react'

const NewCharacter = (props) => {

    const placeholder = {"playbook":"The Chosen","moves":{"basic":null,"playbook":[{"name":"I’m Here For A Reason","description":"There’s something you are destined to do. Work out the details with the Keeper, based on your fate. You cannot die until it comes to pass. If you die in play, then you must spend a Luck point. You will then, somehow, recover or be returned to life. Once your task is done (or you use up all your Luck), all bets are off."},{"name":"Destiny’s Plaything","description":"At the beginning of each mystery, roll +Weird to see what is revealed about your immediate future. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9 you get a vague hint about it. On a miss, something bad is going to happen to you."},{"name":"The Big Entrance","description":"When you make a showy entrance into a dangerous situation, roll +Cool. On 10+ everyone stops to watch and listen until you finish your opening speech. On a 7-9, you pick one person or monster to stop, watch and listen until you finish talking. On a miss, you’re marked as the biggest threat by all enemies who are present."}],"other":null},"details":{"charName":null,"pronouns":null,"look":null,"notes":null},"gear":{"playbook":[[{"name":"Haft","harm":1,"tags":[{"name":"Hand","url":"http://motwapi.com/api/v1/weapon-tags/hand"},{"name":"Heavy","url":"http://motwapi.com/api/v1/weapon-tags/heavy"}]}],[{"name":"Spikes","harm":1,"tags":[{"name":"Messy","url":"http://motwapi.com/api/v1/weapon-tags/messy"}]},{"name":"Long","harm":0,"tags":[{"name":"Close","url":"http://motwapi.com/api/v1/weapon-tags/close"}]},{"name":"Throwable","harm":0,"tags":[{"name":"Close","url":"http://motwapi.com/api/v1/weapon-tags/close"}]}],["Bone"]],"notes":null},"ratings":{"charm":1,"cool":2,"sharp":1,"tough":1,"weird":-1},"history":[],"path":"chosen","specials":{"doom_tags":["You can’t save everyone","No normal life"],"heroic_tags":["Secret training","Visions"],"how_you_found_out":["Nightmares and visions"]}}

    const name = () => {
        return (
            <h1>{props?.newChar?.details.name}</h1>
        )
    }
    const playbook = () => {
        return (
            <h2>{props?.newChar?.playbook}</h2>
        )
    }
    const ratings = () => {
        return (
            <section>
                <h5>Charm:</h5>
                <h3>{props?.newChar?.ratings?.charm}</h3>
                <h5>Cool:</h5>
                <h3>{props?.newChar?.ratings?.cool}</h3>
                <h5>Sharp:</h5>
                <h3>{props?.newChar?.ratings?.sharp}</h3>
                <h5>Tough:</h5>
                <h3>{props?.newChar?.ratings?.tough}</h3>
                <h5>Weird:</h5>
                <h3>{props?.newChar?.ratings?.weird}</h3>
            </section>
            
        )
    }
    const moves = () => {
        const moveMap = () => {
            return props?.newChar?.moves.playbook.map((item,index) => {
                return (
                    <div>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                    </div>
                )
            })
        }
        return (
            <section>
                {moveMap()}
            </section>
        )
    }

    console.log(placeholder)
    return (
        <div>
            {name()}
            {playbook()}
            {ratings()}
            {moves()}
        </div>
    )

}

export default NewCharacter