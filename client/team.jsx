const { result } = require('underscore');
const helper = require('./helper.js');
const premium = require('./premium.js');
let csrfToken;

let team;
let images;
let ids;

let objs;

const CharacterSearch = (props) => {
    return (
    <form id="characterForm" action="characters" method="post">
    <input id="characterField" type="search" name="name" />
    <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
    </form>
    );
}

const init = async () => {
    premium.init();
    const response = await fetch('/getToken');
    const data = await response.json();

    // const load = await fetch('/load');
    // const onLoad = await load.json();

    // const wait = await fetch(`/getCharacter?name=636e6574f553b97a16cfc184`);
    // const obj = await wait.json();
    // console.log(obj);

    csrfToken = data.csrfToken;
    ReactDOM.render(
        <CharacterSearch csrf={csrfToken} />,
        document.getElementById('search')
    );

    const searchBox = document.querySelector('#characterField');
    searchBox.addEventListener('input', async ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('results'));
        const response = await fetch(`/searchCharacters?name=${searchBox.value}`);
        const obj = await response.json();
            ReactDOM.render(
                <CharacterList character={obj} />,
                document.getElementById('results')
            );
    });

    // I don't know what to do about this

    // const getTeam = await fetch('/getTeam');
    // const theTeam = await getTeam.json();
    // console.log(theTeam);
    // await getTeamImages();

    const load = await fetch('/load', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _csrf: csrfToken }),
    });

    const getTeam = await fetch('/yourTeam');
    team = await getTeam.json();
    console.log(team);
    if(team.error)
    {

        const makeTeam = await fetch('/loadTeam', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _csrf: csrfToken }),
        });

        const getTeam = await fetch('/yourTeam');
        team = await getTeam.json();
    }


    // objs = [];
    // for(let i = 0; i < team.team[0].team.length; i++)
    // {
    //     const wait = await fetch(`/getCharacter?name=${team.team[0].team[i]}`);
    //     const obj = await wait.json();
    //     console.log(obj.character);
    //     objs.push(obj.character);
    // }

    ReactDOM.render(
        <TeamMembers csrf={csrfToken} obj={team}/>,
        document.getElementById('team')
    );

    // ReactDOM.render(
    //     <TeamMembers csrf={csrfToken}/>,
    //     document.getElementById('team')
    // );
    
    // await updateMembers();
}

const updateTeam = async (e) => 
{
    e.preventDefault();
    helper.hideError();

    if(!e.target.querySelector("#_id")) {
        return false;
    }

    const _id = e.target.querySelector("#_id").value;
    const _csrf = e.target.querySelector("#_csrf").value;
    if(!_id || !_csrf)
    {
        // helper.handleError('All fields are required!');
        return false;
    }

    helper.teamWork(e.target.action, {_id, _csrf}, async(result)=>{
        const getTeam = await fetch('/yourteam')
        const theTeam = await getTeam.json();
        ReactDOM.render(
            <TeamMembers csrf={csrfToken} obj={theTeam} />,
            document.getElementById('team')
        );
    });

    // It just jumps to reactdom
    // objs = [];
    // for(let i = 0; i < team.team[0].team.length; i++)
    // {
    //     const wait = await fetch(`/getCharacter?name=${team.team[0].team[i]}`);
    //     const obj = await wait.json();
    //     console.log(obj.character);
    //     objs.push(obj.character);
    // }

    
    // updateMembers();
    return false;
    
}

const grabTeam = async () =>
{
    await getTeamImages();
    ReactDOM.render(
        <TeamMembers csrf={csrfToken} images={images} id={ids} />,
        document.getElementById('team')
    );
}

const CharacterList = (props) => {

    if(props.character.length === 0 || props.character.length === undefined)
    {
        return (
            <div className="characterList">
                <h3 className="emptyDomo">No characters found</h3>
            </div>
        );
    }

    const characters = props.character.map(chr => {
        return (
            // <div key = {chr._id} className="char">
            //     {/* <img src={chr.image} alt={chr.name} height="150px" style="object-fit: contain;" id={chr._id}></img> */}
            //     <h3 className="domoName"> Name: {chr.name} </h3>
            //     {/* <h3 className="domoAge"> Age: {domo.age} </h3> */}
            // </div>
            <form id="addToTeam" 
            name={chr.name}
            key={chr._id} 
            onSubmit={updateTeam} 
            action="/add" 
            method="POST" 
            className="set">
                <input type="image" height="150" src={chr.image} />
                <h3 className="characterName"> {chr.name} </h3>
                <input id="_id" type="hidden" name="_id" value={chr._id} />
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
            </form>
        );
    });

    return(
        <div className="characterList">
            {characters}
        </div>
    );
}

const TeamMembers = (props) => {

    const content = [];
    // const theTeam = team.team[0].team;

        for (let i = 0; i < props.obj.length; i++)
        {
            const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={i} onSubmit={updateTeam} >
                <input type="image" height="50" width="50" src={props.obj[i].image} className="player" id={i} />
                <input id="_id" type="hidden" name="_id" value={props.obj[i]._id} />
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
                </form>  
            content.push(imageForm);
        }
        for (let i = props.obj.length; i < 20; i++)
        {
            const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={i} onSubmit={updateTeam} >
                <input type="image" height="50" width="50" src="/assets/img/150.png" className="player" id={i} disabled />
                {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
                <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
                </form>  
            content.push(imageForm);
        }

    // arrayPusher(content);
    // console.log(content);

    // Keeping this until I figure out how to use async data in react

    // for (let i = 0; i < 20; i++)
    // {
    //     const imageForm = <form id={"characterSlot" + i} action="/remove" method="POST" className="d-sides" key={i} onSubmit={updateTeam} >
    //         <input type="image" height="50" width="50" src="/assets/img/150.png" className="player" id={i} />
    //         {/* <input id="_id" type="hidden" name="_id" value={chr._id} /> */}
    //         <input id="_csrf" type="hidden" name="_csrf" value={csrfToken} />
    //         </form>  
    //     content.push(imageForm);
    // }
    return content;
    // return(<div></div>)
}

const getTeamImages = async (e) =>
{
    images = [];
    ids = [];
    const theTeam = team;
    for(let i = 0; i < theTeam.length; i++)
    {
        const wait = await fetch(`/getCharacter?name=${theTeam[i]}`);
        const obj = await wait.json();
        // console.log(obj.character.image);
        images.push(obj.character.image);
        ids.push(obj.character._id);
    }
}

const updateMembers = async (e) =>
{
    const getTeam = await fetch('/yourteam');
    const theTeam = await getTeam.json();
    console.log(theTeam);
    // for(let i = 0; i < e.character.team.length; i++)
    if(theTeam.length != 0)
    {
        for(let i = 0; i < theTeam.length; i++)
        {
            const wait = await fetch(`/getCharacter?name=${members[i]}`);
            const obj = await wait.json();
            const img = document.getElementById(i);
            // console.log(img.height);
            img.src = obj.character.image;
            // Disable is not working
            img.disable = false;
    
            const addition = document.getElementById(`characterSlot${i}`);
            addition.innerHTML += `<input id="_id" type="hidden" name="_id" value=${obj.character._id} />`;
            // What's suppose to happen
            // For every character on the team
                // Get the input with the id of that number
                // src equals character image
                // enable it
                // If all becomes twenty 
        }
    }
    for(let i = members.length; i < 20; i++)
    {
        const addition = document.getElementById(`characterSlot${i}`);
        const idInput = addition.querySelector('#_id');
        if(idInput != null)
        {
            addition.removeChild(idInput);
        }
        const img = document.getElementById(i);
        img.src = "/assets/img/150.png";
        img.disable = true;
    }

    // ReactDOM.render(
    //     <TeamMembers csrf={csrfToken} />,
    //     document.getElementById('team')
    // );
}

window.onload = init;