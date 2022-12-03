/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/game.jsx":
/*!*************************!*\
  !*** ./client/game.jsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst premium = __webpack_require__(/*! ./premium.js */ \"./client/premium.js\");\nlet csrfToken;\nlet accounts;\nlet player;\nlet opponent;\nlet playerTeam;\nlet opposingTeam;\nlet ai = false;\n\n// game variables\nconst playerAlive = [];\nconst playerDead = [];\nconst opponentAlive = [];\nconst opponentDead = [];\nlet startGame = false;\nlet pName, oName;\nconst SelectGame = props => {\n  // console.log(props.team);\n\n  if (props.team.length !== 20) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"characterList\"\n    }, /*#__PURE__*/React.createElement(\"h3\", {\n      className: \"emptyDomo\"\n    }, \"You need a team of 20 players in order to participate\"));\n  }\n  let anotherPlayer = '';\n\n  // This will be commented out if I cannot figure out how to fix this. I'll probably ask Austin on Monday\n  if (accounts.accounts.length !== 0) anotherPlayer = /*#__PURE__*/React.createElement(\"button\", {\n    type: \"exist\",\n    onClick: otherPlayer\n  }, \"Play against Another Player\");\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"characterList\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    key: \"gameMenu\",\n    id: \"gameMenu\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    type: \"ai\",\n    onClick: aiPlayer\n  }, \"Play against AI\"), anotherPlayer));\n};\nconst SelectTeam = props => {\n  let content = [];\n  let type;\n  for (let i = 0; i < 20; i++) {\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: \"p\" + i\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: \"/assets/img/150.png\",\n      className: \"player\",\n      id: \"p\" + i,\n      disabled: true\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    content.push(imageForm);\n  }\n  let oppContent = [];\n  for (let i = 0; i < 20; i++) {\n    const imageForm = /*#__PURE__*/React.createElement(\"form\", {\n      id: \"characterSlot\" + i,\n      action: \"/remove\",\n      method: \"POST\",\n      className: \"d-sides\",\n      key: \"o\" + i\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"image\",\n      height: \"50\",\n      width: \"50\",\n      src: \"/assets/img/150.png\",\n      className: \"opponent\",\n      id: \"o\" + i,\n      disabled: true\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      id: \"_csrf\",\n      type: \"hidden\",\n      name: \"_csrf\",\n      value: csrfToken\n    }));\n    oppContent.push(imageForm);\n  }\n  if (ai) type = /*#__PURE__*/React.createElement(\"button\", {\n    type: \"exist\",\n    onClick: aiPlayer\n  }, \"Find Another Team\");else type = /*#__PURE__*/React.createElement(\"button\", {\n    type: \"exist\",\n    onClick: otherPlayer\n  }, \"Find Another Team\");\n  return /*#__PURE__*/React.createElement(\"div\", {\n    id: \"teams\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    id: \"twoteams\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    id: \"teamPlayer\"\n  }, /*#__PURE__*/React.createElement(\"h2\", {\n    id: \"pName\"\n  }), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"teamP\"\n  }, content)), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"vs\"\n  }, \"vs.\"), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"teamOpponent\"\n  }, /*#__PURE__*/React.createElement(\"h2\", {\n    id: \"oName\"\n  }), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"teamO\"\n  }, oppContent))), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"buttons\"\n  }, type, /*#__PURE__*/React.createElement(\"button\", {\n    type: \"exist\",\n    onClick: gameStart\n  }, \"Play Game\")));\n};\nconst Game = props => {\n  // props.player\n  // props.opponent\n\n  // if character.flip is true, transform: scaleY(-1);\n\n  // document.addEventListener('keydown', function(event) {\n  // if(event.keyCode == 37) {\n  // alert('Left was pressed');\n  // }\n  // else if(event.keyCode == 39) {\n  // alert('Right was pressed');\n  // }\n\n  // Space is 32\n\n  // Lerp function, lerp(current number, new number, 1)\n  // });\n\n  const game = /*#__PURE__*/React.createElement(\"div\", {\n    id: \"game\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    id: \"battle\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    id: \"player\"\n  }, /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"remainingPlayers\"\n  }, \"Players Left: \"), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"playerCharName\"\n  }), /*#__PURE__*/React.createElement(\"img\", {\n    src: \"\",\n    alt: \"player\",\n    id: \"yourGuy\"\n  }), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"yourNumber\"\n  })), /*#__PURE__*/React.createElement(\"h3\", null, \"vs.\"), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"opponent\"\n  }, /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"remainingOpponents\"\n  }, \"Players Left: \"), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"opponentCharName\"\n  }), /*#__PURE__*/React.createElement(\"img\", {\n    src: \"\",\n    alt: \"opponent\",\n    id: \"theirGuy\"\n  }), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"theirNumber\"\n  }))), /*#__PURE__*/React.createElement(\"h3\", {\n    id: \"roll\"\n  }, \"Turn\"), /*#__PURE__*/React.createElement(\"button\", {\n    type: \"exist\",\n    id: \"space\",\n    onClick: yourRoll\n  }, \"Roll\"));\n  console.log(\"crapple\");\n  return game;\n};\nconst Winner = props => {\n  let content = [];\n  for (let i = 0; i < 20; i++) {\n    const image = /*#__PURE__*/React.createElement(\"img\", {\n      src: \"\",\n      alt: \"winner\",\n      height: \"100px\",\n      key: `${i}won`,\n      id: 'y' + i\n    });\n    content.push(image);\n  }\n  let message = '';\n  if (props.message) {\n    message = \"You Win!\";\n  } else {\n    message = \"You Lose!\";\n  }\n  return /*#__PURE__*/React.createElement(\"div\", {\n    id: \"final\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, message), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"winners\"\n  }, content), /*#__PURE__*/React.createElement(\"button\", {\n    id: \"tryagain\",\n    onClick: tryAgain\n  }, \" Try Again \"));\n};\nconst aiPlayer = async () => {\n  const other = await fetch(`/random`);\n  opponent = await other.json();\n  // console.log(opponent.team);\n  ai = true;\n  await loadOpposingTeam(player, opponent, \"Bot\");\n};\nlet oUsername;\nconst otherPlayer = async () => {\n  const o = Math.floor(Math.random() * accounts.accounts.length);\n  const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);\n  oUsername = accounts.accounts[o].owner;\n  opponent = await other.json();\n  // console.log(opponent);\n  // await loadOpposingTeam(player, opponent.team);\n  await loadOpposingTeam(player, opponent);\n};\nconst loadOpposingTeam = async (p, o, b) => {\n  // const o = Math.floor(Math.random() * accounts.accounts.length);\n\n  // const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);\n  // opponent = await other.json();\n\n  // await preGame(player.team[0].team, opponent.team.team);\n\n  startGame = false;\n  playerTurn = null;\n  opponentTurn = null;\n  ReactDOM.render( /*#__PURE__*/React.createElement(SelectTeam, {\n    csrf: csrfToken\n  }), document.getElementById('stage'));\n  premium.init();\n  let oMembers;\n  const pMembers = playerTeam = p;\n  if (ai) oMembers = opposingTeam = o.team;else oMembers = opposingTeam = o;\n  // const oMembers = opposingTeam = o;\n\n  // console.log(oMembers);\n\n  const yourName = await fetch(`/user`);\n  const getMyName = await yourName.json();\n  if (b == null) {\n    const theirName = await fetch(`/oUser?id=${oUsername}`);\n    const getTheirName = await theirName.json();\n    document.querySelector('#oName').innerHTML = oName = getTheirName.username;\n  } else {\n    document.querySelector('#oName').innerHTML = oName = b;\n  }\n  document.querySelector('#pName').innerHTML = pName = getMyName.username;\n  for (let i = 0; i < pMembers.length; i++) {\n    // const wait = await fetch(`/getCharacter?name=${pMembers[i]}`);\n    // const obj = await wait.json();\n    const img = document.getElementById(\"p\" + i);\n    // console.log(img.height);\n    img.src = pMembers[i].image;\n    // Disable is not working\n    img.disable = false;\n    const addition = document.getElementById(`characterSlot${i}`);\n    addition.innerHTML += `<input id=\"_id\" type=\"hidden\" name=\"_id\" value=${pMembers[i]._id} />`;\n  }\n  for (let i = 0; i < oMembers.length; i++) {\n    const img = document.getElementById(\"o\" + i);\n    const addition = document.getElementById(`characterSlot${i}`);\n    if (ai) {\n      img.src = oMembers[i].image;\n      addition.innerHTML += `<input id=\"_id\" type=\"hidden\" name=\"_id\" value=${oMembers[i]._id} />`;\n    } else {\n      // console.log(oMembers[i]);\n\n      // const wait = await fetch(`/getCharacter?name=${oMembers[i]}`);\n      // const obj = await wait.json();\n      // // console.log(img.height);\n      img.src = oMembers[i].image;\n      // Disable is not working\n      img.disable = false;\n      addition.innerHTML += `<input id=\"_id\" type=\"hidden\" name=\"_id\" value=${oMembers[i]._id} />`;\n    }\n  }\n};\nconst gameStart = async () => {\n  ReactDOM.render( /*#__PURE__*/React.createElement(Game, {\n    csrf: csrfToken\n  }), document.getElementById('stage'));\n  premium.init();\n  if (playerAlive.length != 0) {\n    playerAlive.splice(0);\n    playerDead.splice(0);\n    opponentAlive.splice(0);\n    opponentDead.splice(0);\n  }\n  for (let i = 0; i < 20; i++) {\n    playerAlive.push(playerTeam[i]);\n    if (ai) opponentAlive.push(opposingTeam[i]._id);else opponentAlive.push(opposingTeam[i]);\n  }\n\n  // console.log(opponentAlive.length);\n\n  startGame = true;\n  curOpNum = 0;\n  curPNum = 0;\n  console.log(pName);\n  console.log(oName);\n  if (startGame) {\n    await playGame();\n    // setInterval(await playGame);\n  }\n};\n\nlet playerTurn;\nlet opponentTurn;\nlet curOpNum = 0;\nlet curPNum = 0;\n\n// rolling\nlet plyRoll;\nlet oppRoll;\nlet roundOne = true;\nconst playGame = async () => {\n  // console.log(\"Start\");\n\n  // console.log(document.getElementById(\"remainingPlayers\"));\n\n  // const getPlayer = await fetch(`/getCharacter?name=${playerAlive[0]}`);\n  const ply = playerAlive[0];\n  let opp;\n  if (ai) {\n    const getOpponent = await fetch(`/getCharacter?name=${opponentAlive[0]}`);\n    opp = await getOpponent.json();\n  } else {\n    const getOpponent = await fetch(`/getCharacter?name=${opponentAlive[0]._id}`);\n    opp = await getOpponent.json();\n  }\n\n  // console.log(opp.character.image);\n\n  // Get all the images of characters\n  const playerImg = document.getElementById('yourGuy');\n  const opponentImg = document.getElementById('theirGuy');\n  document.getElementById('remainingPlayers').innerHTML = `Players Left: ${playerAlive.length}`;\n  document.getElementById('remainingOpponents').innerHTML = `Players Left: ${opponentAlive.length}`;\n  document.getElementById('playerCharName').innerHTML = ply.name;\n  document.getElementById('opponentCharName').innerHTML = opp.character.name;\n  const playerRollOutput = document.getElementById('yourNumber');\n  const opponentRollOutput = document.getElementById('theirNumber');\n  playerRollOutput.innerHTML = curPNum;\n  opponentRollOutput.innerHTML = curOpNum;\n  playerImg.src = ply.image;\n  opponentImg.src = opp.character.image;\n\n  // plyRoll = null;\n  // oppRoll = null;\n\n  plyRoll = null;\n  oppRoll = null;\n  if (ply.flip) {\n    playerImg.style.transform = \"scaleX(-1)\";\n  } else {\n    playerImg.style.transform = null;\n  }\n  if (!opp.character.flip) {\n    opponentImg.style.transform = \"scaleX(-1)\";\n  } else {\n    opponentImg.style.transform = null;\n  }\n  let coinFlip;\n  if (playerTurn == null && opponentTurn == null) {\n    const random = Math.random();\n    coinFlip = random < 0.5;\n    if (coinFlip) playerTurn = true;else opponentTurn = true;\n  }\n  const roll = document.getElementById('roll');\n  if (opponentTurn) {\n    roll.innerHTML = `${oName}'s Turn`;\n    document.getElementById('space').style.display = \"none\";\n    setTimeout(getRandomOpponent, 2000);\n    // getRandomOpponent();\n  }\n\n  if (playerTurn) {\n    document.getElementById('space').style.display = \"block\";\n    roll.innerHTML = `${pName}'s Turn`;\n  }\n\n  // Goals: figure out how to do timer for opponent\n\n  // document.addEventListener('keypress', function(event) {\n  // 32 is the code for space\n  // if(event.keyCode != 32 || !playerTurn) return;\n  // plyRoll = getRandomInt(21);\n  // // playerRollOutput.innerHTML = lerp(curPNum,plyRoll,1);\n  // playerRollOutput.innerHTML = plyRoll;\n  // curPNum = plyRoll;\n  // // console.log(plyRoll);\n  // if(oppRoll == null)\n  // {\n  //     playerTurn = false;\n  //     opponentTurn = true;\n  //     roll.innerHTML = `${oName}'s Turn`;\n  //     setTimeout(getRandomOpponent, 1000);\n  //     // getRandomOpponent();\n  // }\n  // else\n  // {\n  //     compareNumbers(plyRoll,oppRoll);\n  // }\n  // }\n  // }\n  // });\n};\n\n// What if instead of the spacebar, I can just create a button?\n\nfunction getRandomOpponent() {\n  const roll = document.getElementById('roll');\n  const opponentRollOutput = document.getElementById('theirNumber');\n  oppRoll = getRandomInt(21);\n  // opponentRollOutput.innerHTML = lerp(curOpNum,oppRoll,1);\n  opponentRollOutput.innerHTML = oppRoll;\n  curOpNum = oppRoll;\n  // I just realized I need to figure out how I'm going to do a tie. Maybe if it's a tie, I'll make the player go first\n  if (plyRoll == null) {\n    playerTurn = true;\n    opponentTurn = false;\n    document.getElementById('space').style.display = \"block\";\n    roll.innerHTML = `${pName}'s Turn`;\n  } else {\n    compareNumbers(plyRoll, oppRoll);\n  }\n}\nfunction yourRoll() {\n  if (!playerTurn) return;\n  const playerRollOutput = document.getElementById('yourNumber');\n  plyRoll = getRandomInt(21);\n  // playerRollOutput.innerHTML = lerp(curPNum,plyRoll,1);\n  playerRollOutput.innerHTML = plyRoll;\n  curPNum = plyRoll;\n  if (oppRoll == null) {\n    playerTurn = false;\n    opponentTurn = true;\n    document.getElementById('space').style.display = \"none\";\n    roll.innerHTML = `${oName}'s Turn`;\n    setTimeout(getRandomOpponent, 1000);\n    // getRandomOpponent();\n  } else {\n    compareNumbers(plyRoll, oppRoll);\n  }\n}\nfunction getRandomInt(max) {\n  return Math.floor(Math.random() * max);\n}\n\n// It's skipping numbers and I don't know why. I'll have to ask Austin on friday\nfunction compareNumbers(a, b) {\n  document.getElementById('space').style.display = \"none\";\n  playerTurn = false;\n  opponentTurn = false;\n  if (a > b) {\n    // console.log(\"You Win\");\n    roll.innerHTML = `Point ${pName}`;\n    setTimeout(async function () {\n      opponentDead.push(opponentAlive[0]);\n      opponentAlive.splice(0, 1);\n      if (opponentAlive.length == 0) {\n        console.log(\"Winner: You!\");\n        await callWinner(true);\n      } else {\n        playerTurn = true;\n        opponentTurn = false;\n        playGame();\n      }\n    }, 1000);\n  } else if (a < b) {\n    roll.innerHTML = `Point ${oName}`;\n    // console.log(\"You Lose\");\n    setTimeout(async function () {\n      playerDead.push(playerAlive[0]);\n      playerAlive.splice(0, 1);\n      playerTurn = false;\n      opponentTurn = true;\n      if (playerAlive.length == 0) {\n        console.log(\"Winner: Other Guy\");\n        await callWinner(false);\n      } else {\n        playGame();\n      }\n    }, 1000);\n  } else if (a == b) {\n    // console.log(\"Tie\");\n    roll.innerHTML = `Tie`;\n    setTimeout(function () {\n      plyRoll = null;\n      oppRoll = null;\n      let coinFlip;\n      const random = Math.random();\n      coinFlip = random < 0.5;\n      if (coinFlip) {\n        playerTurn = true;\n        document.getElementById('space').style.display = \"block\";\n        roll.innerHTML = `${pName}'s Turn`;\n      } else {\n        opponentTurn = true;\n        roll.innerHTML = `${oName}'s Turn`;\n        setTimeout(getRandomOpponent, 1000);\n        // getRandomOpponent();\n      }\n    }, 1000);\n  }\n}\nasync function callWinner(win) {\n  ReactDOM.render( /*#__PURE__*/React.createElement(Winner, {\n    message: win\n  }), document.getElementById('stage'));\n  premium.init();\n  let winners;\n  if (win) {\n    // Win method\n    const win = await fetch('/win', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        _csrf: csrfToken\n      })\n    });\n    const winner = await win.json();\n    console.log(winner);\n    winners = playerTeam;\n    for (let i = 0; i < winners.length; i++) {\n      const img = document.getElementById(\"y\" + i);\n      img.src = winners[i].image;\n    }\n  } else {\n    // Lose method\n    const lose = await fetch('/lose', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        _csrf: csrfToken\n      })\n    });\n    const loser = await lose.json();\n    console.log(loser);\n    winners = opposingTeam;\n    // console.log(winners);\n    if (ai) {\n      for (let i = 0; i < winners.length; i++) {\n        // Apparently it's getting back an object, which IDK why\n        // console.log(winners[i]);\n        // const wait = await fetch(`/getCharacter?name=${winners[i]._id}`);\n        // const obj = await wait.json();\n        const img = document.getElementById(\"y\" + i);\n        img.src = winners[i].image;\n      }\n    } else {\n      for (let i = 0; i < winners.length; i++) {\n        // Apparently it's getting back an object, which IDK why\n        // console.log(winners[i]);\n        const wait = await fetch(`/getCharacter?name=${winners[i]._id}`);\n        const obj = await wait.json();\n        const img = document.getElementById(\"y\" + i);\n        img.src = obj.character.image;\n      }\n    }\n  }\n}\nasync function callWinnerBuild() {\n  // const other = await fetch(`/random`);\n  // opponent = await other.json();\n\n  const o = Math.floor(Math.random() * accounts.accounts.length);\n  const other = await fetch(`/theirTeam?team=${accounts.accounts[o].owner}`);\n  oUsername = accounts.accounts[o].owner;\n  opponent = await other.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(Winner, {\n    message: false\n  }), document.getElementById('stage'));\n  let winners;\n  // if(win)\n  // {\n  //     winners = playerTeam;\n  //     for(let i = 0; i < winners.length; i++)\n  //     {\n  //         const img = document.getElementById(\"y\"+i);\n  //         img.src = winners[i].image;\n  //     }\n  // }\n  // else\n  // {\n  // for(let i = 0; i < op.team.team.length; i++)\n  // {\n  //      // Apparently it's getting back an object, which IDK why\n  //     console.log(op.team.team[i]);\n  //     const wait = await fetch(`/getCharacter?name=${op.team.team[i]}`);\n  //     // const obj = await wait.json();\n  //     // console.log(obj);\n  //     // const img = document.getElementById(\"y\"+i);\n  //     // console.log(img.height);\n  //     // img.src = obj.character.image;\n  // }\n\n  winners = opponent;\n  // winners = opponent.team.team;\n  // console.log(winners);\n  for (let i = 0; i < winners.length; i++) {\n    // Apparently it's getting back an object, which IDK why\n    // console.log(winners[i]);\n    const wait = await fetch(`/getCharacter?name=${winners[i]._id}`);\n    const obj = await wait.json();\n    // console.log(obj);\n    const img = document.getElementById(\"y\" + i);\n    img.src = obj.character.image;\n  }\n\n  // }\n}\n\nfunction tryAgain() {\n  ai = false;\n  if (playerAlive.length != 0) playerAlive.splice(0, playerAlive.length);\n  if (opponentAlive.length != 0) opponentAlive.splice(0, opponentAlive.length);\n  ReactDOM.render( /*#__PURE__*/React.createElement(SelectGame, {\n    team: player\n  }), document.getElementById('stage'));\n  premium.init();\n}\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  csrfToken = data.csrfToken;\n  const fetchTeam = await fetch('/yourTeam');\n  player = await fetchTeam.json();\n  console.log(player);\n  const load = await fetch('/accounts');\n  accounts = await load.json();\n  ReactDOM.render( /*#__PURE__*/React.createElement(SelectGame, {\n    team: player\n  }), document.getElementById('stage'));\n  premium.init();\n\n  // await callWinnerBuild();\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/game.jsx?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\nconst handleTeam = message => {\n  document.getElementById('message').textContent = message;\n  document.getElementById('message').classList.remove('hidden');\n  document.getElementById('team').style.borderColor = \"#ff1e00\";\n};\n\n// Only for the login page\nconst loginError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  // document.getElementById(\"pass2\").style.borderColor = \"red\";\n\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\nconst signUpError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  document.getElementById(\"pass2\").style.borderColor = \"red\";\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\nconst post = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  return result;\n};\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('message').classList.add('hidden');\n  document.getElementById('team').style.borderColor = \"#000000\";\n};\nconst hideThing = () => {\n  document.getElementById('loginMessage').classList.add('hidden');\n};\nconst vDomo = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst loginAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    loginError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst signUpAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    signUpError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst teamWork = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleTeam(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst setColor = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  // console.log(result.head);\n\n  const nav = document.querySelector('nav');\n  const body = document.querySelector('body');\n  const buttons = document.querySelectorAll('button');\n  const links = document.querySelectorAll('a');\n  const submits = document.querySelector('.formSubmit');\n  // console.log(submits);\n\n  // console.log(luma(result.head));\n  // if it's true, then set text to white, else set it to black\n\n  nav.style.backgroundColor = result.head;\n  body.style.backgroundColor = result.body;\n  if (luma(result.body)) {\n    body.style.color = \"white\";\n  } else {\n    body.style.color = \"black\";\n  }\n  buttons.forEach(button => button.style.backgroundColor = result.head);\n  links.forEach(a => a.style.backgroundColor = result.head);\n  if (luma(result.head)) {\n    buttons.forEach(button => button.style.color = \"white\");\n    links.forEach(a => a.style.color = \"white\");\n  } else {\n    buttons.forEach(button => button.style.color = \"black\");\n    links.forEach(a => a.style.color = \"black\");\n  }\n  const unlock = document.getElementById('premium');\n  if (unlock != null || unlock != undefined) {\n    if (luma(result.head)) {\n      unlock.style.backgroundColor = \"white\";\n      unlock.style.color = result.head;\n    } else {\n      unlock.style.backgroundColor = result.head;\n      unlock.style.color = \"black\";\n    }\n    const submits = document.querySelector('#apply');\n    if (submits != null || submits != undefined) {\n      submits.style.backgroundColor = result.head;\n      if (luma(result.head)) {\n        submits.style.backgroundColor = \"white\";\n        submits.style.color = result.head;\n      } else {\n        submits.style.backgroundColor = result.head;\n        submits.style.color = \"black\";\n      }\n    }\n  }\n};\nconst luma = a => {\n  var c = a.substring(1); // strip #\n  var rgb = parseInt(c, 16); // convert rrggbb to decimal\n  var r = rgb >> 16 & 0xff; // extract red\n  var g = rgb >> 8 & 0xff; // extract green\n  var b = rgb >> 0 & 0xff; // extract blue\n\n  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709\n\n  return luma < 80;\n};\nfunction hexToHSL(H) {\n  // Convert hex to RGB first\n  let r = 0,\n    g = 0,\n    b = 0;\n  if (H.length == 4) {\n    r = \"0x\" + H[1] + H[1];\n    g = \"0x\" + H[2] + H[2];\n    b = \"0x\" + H[3] + H[3];\n  } else if (H.length == 7) {\n    r = \"0x\" + H[1] + H[2];\n    g = \"0x\" + H[3] + H[4];\n    b = \"0x\" + H[5] + H[6];\n  }\n  // Then to HSL\n  r /= 255;\n  g /= 255;\n  b /= 255;\n  let cmin = Math.min(r, g, b),\n    cmax = Math.max(r, g, b),\n    delta = cmax - cmin,\n    h = 0,\n    s = 0,\n    l = 0;\n  if (delta == 0) h = 0;else if (cmax == r) h = (g - b) / delta % 6;else if (cmax == g) h = (b - r) / delta + 2;else h = (r - g) / delta + 4;\n  h = Math.round(h * 60);\n  if (h < 0) h += 360;\n  l = (cmax + cmin) / 2;\n  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));\n  s = +(s * 100).toFixed(1);\n  l = +(l * 100).toFixed(1);\n  return \"hsl(\" + h + \",\" + s + \"%,\" + l + \"%)\";\n}\nfunction HSLToHex(h, s, l) {\n  s /= 100;\n  l /= 100;\n  let c = (1 - Math.abs(2 * l - 1)) * s,\n    x = c * (1 - Math.abs(h / 60 % 2 - 1)),\n    m = l - c / 2,\n    r = 0,\n    g = 0,\n    b = 0;\n  if (0 <= h && h < 60) {\n    r = c;\n    g = x;\n    b = 0;\n  } else if (60 <= h && h < 120) {\n    r = x;\n    g = c;\n    b = 0;\n  } else if (120 <= h && h < 180) {\n    r = 0;\n    g = c;\n    b = x;\n  } else if (180 <= h && h < 240) {\n    r = 0;\n    g = x;\n    b = c;\n  } else if (240 <= h && h < 300) {\n    r = x;\n    g = 0;\n    b = c;\n  } else if (300 <= h && h < 360) {\n    r = c;\n    g = 0;\n    b = x;\n  }\n  // Having obtained RGB, convert channels to hex\n  r = Math.round((r + m) * 255).toString(16);\n  g = Math.round((g + m) * 255).toString(16);\n  b = Math.round((b + m) * 255).toString(16);\n\n  // Prepend 0s, if necessary\n  if (r.length == 1) r = \"0\" + r;\n  if (g.length == 1) g = \"0\" + g;\n  if (b.length == 1) b = \"0\" + b;\n  return \"#\" + r + g + b;\n}\nmodule.exports = {\n  handleError,\n  loginError,\n  signUpError,\n  handleTeam,\n  sendPost,\n  hideError,\n  hideThing,\n  vDomo,\n  loginAccountPage,\n  signUpAccountPage,\n  teamWork,\n  setColor,\n  luma,\n  hexToHSL,\n  HSLToHex\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/premium.js":
/*!***************************!*\
  !*** ./client/premium.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nlet account;\nlet premium;\nlet headercolor;\nlet bodycolor;\nconst init = async () => {\n  const acc = await fetch('/account');\n  account = await acc.json();\n  premium = Object.values(account)[0].premium;\n  headercolor = Object.values(account)[0].header;\n  bodycolor = Object.values(account)[0].body;\n  if (premium) {\n    const nav = document.querySelector('nav');\n    const body = document.querySelector('body');\n    const buttons = document.querySelectorAll('button');\n    const links = document.querySelectorAll('a');\n    nav.style.backgroundColor = headercolor;\n    body.style.backgroundColor = bodycolor;\n    if (helper.luma(bodycolor)) {\n      body.style.color = \"white\";\n    } else {\n      body.style.color = \"black\";\n    }\n    links.forEach(a => a.style.backgroundColor = headercolor);\n    buttons.forEach(button => button.style.backgroundColor = headercolor);\n    if (helper.luma(headercolor)) {\n      buttons.forEach(button => button.style.color = \"white\");\n      links.forEach(a => a.style.color = \"white\");\n      document.getElementById('selected').style.color = \"white\";\n    } else {\n      buttons.forEach(button => button.style.color = \"black\");\n      links.forEach(a => a.style.color = \"black\");\n      document.getElementById('selected').style.color = \"black\";\n    }\n  }\n  document.getElementById('logo').src = account.account.picture;\n};\n\n// window.onload = init;\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://Logins/./client/premium.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/game.jsx");
/******/ 	
/******/ })()
;