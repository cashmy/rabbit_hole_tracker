
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getData() {
  const itotal = getRandomInt(10);
  const dtotal = getRandomInt(10);
  const ttotal = getRandomInt(10);
  const utotal = getRandomInt(10);
  const data =
    [
      {
        "type": "i",
        "type_name": "Impediment",
        "total": itotal,
        "solutions": getRandomInt(itotal),
        "completed": getRandomInt(itotal),
        "unclassified": getRandomInt(itotal),
      },
      {
        "type": "d",
        "type_name": "Distractions",
        "total": dtotal,
        "solutions": getRandomInt(dtotal),
        "completed": getRandomInt(dtotal),
        "unclassified": getRandomInt(dtotal),
      }, {
        "type": "t",
        "type_name": "Tasks",
        "total": ttotal,
        "solutions": getRandomInt(ttotal),
        "completed": getRandomInt(ttotal),
        "unclassified": getRandomInt(ttotal),
      }, {
        "type": "u",
        "type_name": "Unclassified",
        "total": utotal,
        "solutions": getRandomInt(utotal),
        "completed": getRandomInt(utotal),
        "unclassified": getRandomInt(utotal),
      }
    ];

  return data
}
