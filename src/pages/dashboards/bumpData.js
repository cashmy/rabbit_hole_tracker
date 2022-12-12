
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getData() {
  const ADD_Tot = getRandomInt(10)+10;
  console.log("ADD Tot: ", ADD_Tot)
  const ADD_Uncl = getRandomInt(ADD_Tot);
  const ADD_Dist = getRandomInt(ADD_Tot-ADD_Uncl);
  const ADD_Task = getRandomInt(ADD_Tot-ADD_Uncl-ADD_Dist)
  const ADD_Imp = ADD_Tot-ADD_Uncl-ADD_Dist-ADD_Task;
  
  const GoT_Tot = getRandomInt(10)+5;
  const GoT_Imp = getRandomInt(GoT_Tot);
  const GoT_Dist = getRandomInt(GoT_Tot-GoT_Imp);
  const GoT_Task = getRandomInt(GoT_Tot-GoT_Imp-GoT_Dist)
  const GoT_Uncl = GoT_Tot-GoT_Imp-GoT_Dist-GoT_Task;
  
  const NPU_Tot = getRandomInt(10)+5;
  const NPU_Imp = getRandomInt(NPU_Tot);
  const NPU_Dist = getRandomInt(NPU_Tot-NPU_Imp);
  const NPU_Task = getRandomInt(NPU_Tot-NPU_Imp-NPU_Dist)
  const NPU_Uncl = NPU_Tot-NPU_Imp-NPU_Dist-NPU_Task;

  const RHT_Tot = getRandomInt(15)+5;
  const RHT_Imp = getRandomInt(RHT_Tot);
  const RHT_Dist = getRandomInt(RHT_Tot-RHT_Imp);
  const RHT_Task = getRandomInt(RHT_Tot-RHT_Imp-RHT_Dist)
  const RHT_Uncl = RHT_Tot-RHT_Imp-RHT_Dist-RHT_Task;

  const STS_Tot = getRandomInt(10)+5;
  console.log("STS Tot: ", STS_Tot)
  const STS_Imp = getRandomInt(STS_Tot);
  const STS_Dist = getRandomInt(STS_Tot-STS_Imp);
  const STS_Task = getRandomInt(STS_Tot-STS_Imp-STS_Dist)
  const STS_Uncl = STS_Tot-STS_Imp-STS_Dist-STS_Task;
  const data =
    [
      {
        "id": "ADD",
        "data": [
          {
            "x": "Tot",
            "y": ADD_Tot,
          },
          {
            "x": "Impediments",
            "y": ADD_Imp
          },
          {
            "x": "Distractions",
            "y": ADD_Dist,
          },
          {
            "x": "Tasks",
            "y": ADD_Task,
          },
          {
            "x": "Unclassified",
            "y": ADD_Uncl,
          },
        ]
      },
      {
        "id": "GoT",
        "data": [
          {
            "x": "Tot",
            "y": GoT_Tot,
          },
          {
            "x": "Impediments",
            "y": GoT_Imp,
          },
          {
            "x": "Distractions",
            "y": GoT_Dist,
          },
          {
            "x": "Tasks",
            "y": GoT_Task,
          },
          {
            "x": "Unclassified",
            "y": GoT_Uncl,
          },
        ]
      },
      {
        "id": "NPU",
        "data": [
          {
            "x": "Tot",
            "y": NPU_Tot,
          },
          {
            "x": "Impediments",
            "y": NPU_Imp,
          },
          {
            "x": "Distractions",
            "y": NPU_Dist,
          },
          {
            "x": "Tasks",
            "y": NPU_Task,
          },
          {
            "x": "Unclassified",
            "y": NPU_Uncl,
          },
        ]
      },
      {
        "id": "RHT",
        "data": [
          {
            "x": "Tot",
            "y": RHT_Tot,
          },
          {
            "x": "Impediments",
            "y": RHT_Imp,
          },
          {
            "x": "Distractions",
            "y": RHT_Dist,
          },
          {
            "x": "Tasks",
            "y": RHT_Task,
          },
          {
            "x": "Unclassified",
            "y": RHT_Uncl,
          },
        ]
      },
      {
        "id": "STS",
        "data": [
          {
            "x": "Tot",
            "y": STS_Tot,
          },
          {
            "x": "Impediments",
            "y": STS_Imp,
          },
          {
            "x": "Distractions",
            "y": STS_Dist,
          },
          {
            "x": "Tasks",
            "y": STS_Task,
          },
          {
            "x": "Unclassified",
            "y": STS_Uncl,
          },
        ]
      },
    ]

  return data
}