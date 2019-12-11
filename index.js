/* eslint-disable no-unused-vars */

const mobilecheck = () => {
    var check = false;
    // eslint-disable-next-line no-useless-escape
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  
  const states = ["forward", "stop", "backward", "stop"]
  let currentState = "stop";
  
  setInterval(() => {
      const drawContainer = document.getElementById("drawContainer");
      const drawContainerRotation = drawContainer.object3D.rotation;
      const hudMapContainer = document.getElementById("hudMapContainer");
      hudMapContainer.object3D.rotation.set(drawContainerRotation._x, drawContainerRotation._y, drawContainerRotation._z);
  }, 50);
  
  document.getElementById("menu").addEventListener("click", () => {
    console.log("clicked");
    const pauseGlobalRotateEl = document.getElementById("pauseGlobalRotation");
    pauseGlobalRotateEl.setAttribute("animation", "enabled: false; property: rotation; dir: reverse; easing: linear; to: 0 360 0; loop: true; dur: 30000");
  });
  
  const getZMax = (coords) => {
      let maxZ = Number.NEGATIVE_INFINITY;
      coords.forEach((coord) => {
          if (typeof coord.z !== 'undefined' && coord.z > maxZ) {
              maxZ = coord.z;
          }
      });
      return maxZ;
  }
  
  const getMedian = (values) => {
      const sorted = [...values].sort();
      return sorted[Math.floor(sorted.length)/2]
  }
  
  
  const getCameraTrajectory = () => {
      return fetch('curves.json')
          .then(response => response.text())
          .then(text => {
              const coords = JSON.parse(text);
              const positions = [];
              coords.forEach((coord, _) => {
                  const position = `${coord.x} ${coord.y} ${coord.z}`;
                  positions.push(position);
              });
              return positions;
          });
  };
  
  const groupBy = (list, keyGetter) => {
      const map = new Map();
      list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
              map.set(key, [item]);
          } else {
              collection.push(item);
          }
      });
      return map;
  }
  
  const getCurvePoints = () => {
      return fetch('curves.json')
      .then(response => response.text())
      .then(text => {
          return JSON.parse(text);
      });
  }
  
  const createBranchPoints = (coords) => {
      const curvePoints = [];
      coords.forEach((coord, _) => {
          const curvePoint = `<a-curve-point position="${coord.x * 100} ${coord.y * 100} ${coord.z * 100}"></a-curve-point>`;
          curvePoints.push(curvePoint);
      });
      return curvePoints;
  }
  
  const getCells = () => {
      return fetch('cells.json')
          .then(response => response.text())
          .then(text => {
              const cell_points = JSON.parse(text);
              const cells = [];
              cell_points.forEach((cell_point, _) => {
                  const stream_cell = `<a-sphere position="${cell_point.x * 100} ${cell_point.y * 100} ${cell_point.z * 100}" color="${cell_point.color}" radius=".05" shadow></a-sphere>`;
                  cells.push(stream_cell);
              })
              return cells;
          });
  }
  
  getCurvePoints()
      .then((coords) => {
          const zMax = getZMax(coords);
          const yValues = Array.from(coords.map(coord => coord.y));
          const xValues = Array.from(coords.map(coord => coord.x));
          const yMedian = getMedian(yValues);
          const xMedian = getMedian(xValues);
  
          const camera_el = document.getElementById("rig");
          camera_el.object3D.position.set(xMedian, yMedian, zMax + .07);
  
          const grouped_coords = groupBy(coords, coord => coord.branch_id);
          const branches = [];
          coords.forEach((coord, _) => {
              if (!branches.includes(coord.branch_id)) {
                  branches.push(coord.branch_id);
              }
          });
  
          const branch_els = []
          const branch_draw_els = []
          branches.forEach((branch, _) => {
              const branch_el = `<a-curve id="${branch}"></a-curve>`;
              branch_els.push(branch_el);
              const branch_draw_el = `<a-draw-curve curveref="#${branch}" material="shader: line; color: blue;"></a-draw-curve>`;
              branch_draw_els.push(branch_draw_el);
          });
  
          const branch_container_el = document.getElementById("curve-container");
          branch_container_el.innerHTML = branch_els.join(" ");
          const map_branch_container = document.getElementById("curve-map");
          map_branch_container.innerHTML = branch_els.join(" ");
          const branch_draw_container = document.getElementById("curve-draw");
          branch_draw_container.innerHTML = branch_draw_els.join(" ");
          const map_draw_container = document.getElementById("draw-map");
          map_draw_container.innerHTML = branch_draw_els.join(" ");
  
          grouped_coords.forEach((group, branch) => {
              const points = createBranchPoints(group);
              const branch_el = document.getElementById(branch);
              branch_el.innerHTML = points.join(" ")
          });
      });
  
  getCells()
      .then((cells) => {
          const cell_el = document.getElementById("cells");
          cell_el.innerHTML = cells.join(" ");
      });
  
  let clickCount = 1;
  
  let positionIndex = 0
  const moveForward = (positions) => {
      if (positionIndex !== positions.length) {
          const camera_el = document.getElementById("rig");
          let position = positions[positionIndex];
          if (mobilecheck()) {
              const scaled = position.map((coord) => {
                  return coord * 50;
              });
              camera_el.object3D.position.set(...scaled);
          } else {
              camera_el.object3D.position.set(...position.split(" "));
          }
          positionIndex = positionIndex + 1;
      }
  }
  
  const moveBackward = (positions) => {
      if (positionIndex !== 0) {
          const camera_el = document.getElementById("rig");
          let position = positions[positionIndex];
          if (mobilecheck()) {
              const scaled = position.map((coord) => {
                  return coord * 50;
              });
              camera_el.object3D.position.set(...scaled);
          } else {
              camera_el.object3D.position.set(...position.split(" "));
          }
          positionIndex = positionIndex - 1;
      }
  }
  
  const moveCamera = async () => {
      const positions = await getCameraTrajectory();
      setInterval(() => {
          if (currentState === "forward") {
              moveForward(positions);
          }
          else if (currentState === "backward") {
              moveBackward(positions);
          }
      }, 300);
  }
  
  document.querySelector('a-scene').addEventListener('enter-vr', () => {
      const cell_el = document.getElementById("cells");
      const branch_draw_container = document.getElementById("curve-draw");
      if (mobilecheck()) {
          cell_el.object3D.scale.set(50, 50, 50);
          branch_draw_container.object3D.scale.set(50, 50, 50);
      }
      // eslint-disable-next-line no-undef
      AFRAME.scenes[0].canvas.addEventListener("touchstart", () => {
          currentState = states[clickCount % states.length];
          clickCount = clickCount + 1;
      });
  
      // eslint-disable-next-line no-undef
      AFRAME.scenes[0].canvas.addEventListener("click", () => {
          currentState = states[clickCount % states.length];
          clickCount = clickCount + 1;
      });
  
  });
  
  moveCamera();