class Node {
  constructor(Entity, freeItem, movedItem) {
    if (Array.isArray(Entity)) { // при создании корня дерева по текущему состоянию пазла
      this.arrOfitems = Entity; // массив состояний: позиция паззла = индекс; значение массива = позиция в истонике(картинке)
      this.level = 0; // уровень в дереве\длинна пути
      this.parent = null; // ссылка на родителя
      // this.Childrens = [];
      this.movedItem = null;
    } else {
      // Entity.Childrens.push(this);
      const newArr = Entity.arrOfitems.slice();// новый массив
      // замена значений
      newArr[freeItem] = Entity.arrOfitems[movedItem];
      newArr[movedItem] = Entity.arrOfitems[freeItem];

      this.arrOfitems = newArr; // массив состояний: позиция паззла = индекс; значение массива = позиция в истонике(картинке)
      this.level = Entity.level + 1; // уровень в дереве\длинна пути
      this.parent = Entity; // ссылка на родителя
      // this.Childrens = [];
      this.movedItem = Entity.arrOfitems[movedItem];
    }
    this.key = JSON.stringify(this.arrOfitems); // ключ для поиска в массве состояний
    // this.key = this.arrOfitems.join(','); // ключ для поиска в массве состояний
    // if (this.notResolvedPos === 0 || this.notResolvedPos === 1) {
    //   alert(`reshenie ${this}`);
    // }
  }

  // число не решенных позиций
  get notResolvedPos() {
    let notResolvedPos = 0;
    this.arrOfitems.forEach((element, index) => {
      notResolvedPos += (element !== index) ? 1 : 0;
    });
    return notResolvedPos;
  }

  // получить значение эвристической функции для элемента(меньше-лучше)\переименвать на что-то понятное
  get depthOfNode() {
    return this.notResolvedPos + this.level;
  }

  // получить индекс "пустой" позиции
  get indexOfFreeItem() {
    let indexOfFreeItem = null;
    this.arrOfitems.forEach((value, index) => {
      if (value === (this.arrOfitems.length - 1)) {
        indexOfFreeItem = index;
      }
    });
    return indexOfFreeItem;
  }

  // получение возможных позиций для перемещения
  get arrOfMovableItems() {
    const arrOfMovableItems = [];
    const filedSize = Math.sqrt(this.arrOfitems.length);
    const Top = this.indexOfFreeItem - filedSize;
    const Bottom = this.indexOfFreeItem + filedSize;
    const Right = this.indexOfFreeItem + 1;
    const Left = this.indexOfFreeItem - 1;

    // сосед снизу не выходит за границы игры
    if (Bottom < this.arrOfitems.length) {
      arrOfMovableItems.push(Bottom);
    }
    // сосед сверху не выходит за границы игры
    if (Top >= 0) {
      arrOfMovableItems.push(Top);
    }
    // сосед справа на той же строке и не выходит за границы игры
    if (Math.floor(Right / filedSize) === Math.floor(this.indexOfFreeItem / filedSize) && Right < this.arrOfitems.length) {
      arrOfMovableItems.push(Right);
    }
    // сосед слева на той же строке и не выходит за границы игры
    if (Math.floor(Left / filedSize) === Math.floor(this.indexOfFreeItem / filedSize) && Left >= 0) {
      arrOfMovableItems.push(Left);
    }
    return arrOfMovableItems;
  }

  // создание потомка тест
  createChildNodes() {
    const MovableItems = this.arrOfMovableItems;
    const arrOfChildrens = [];
    MovableItems.forEach((value) => {
      arrOfChildrens.push(new Node(this, this.indexOfFreeItem, value));
    });

    return arrOfChildrens;
  }
  // проверить по строковому ключу есть ли таккое размещение паззлов в массиве не проверенных состояний
}

export default function getSolution(PuzzleAsArray, puzzleObj) {
  // const closedList = [];
  const openList = [];// массив состояний
  const closedList = [];// массив состояний проверенных
  let resolved = false;
  const solution = [];
  const MainNode = new Node(PuzzleAsArray);
  // индекс подобного состояния в массиве обрабатываемых состояний
  function getNodeIndexInOpenList(node) {
    let position = null;
    // openList.forEach((value, index) => {
    //   if (value.key === node.key) {
    //     position = index;
    //   }
    // });
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].key === node.key) {
        position = i;
        break;
      }
    }
    return position;
  }

  function getNodeIndexInClosedList(node) {
    let position = null;
    // openList.forEach((value, index) => {
    //   if (value.key === node.key) {
    //     position = index;
    //   }
    // });
    for (let i = 0; i < closedList.length; i++) {
      if (closedList[i].key === node.key) {
        position = i;
        break;
      }
    }
    return position;
  }

  function getNodeWithMinDepth() {
    let SearchedNode = null;
    let minDepth = null;
    openList.forEach((value) => {
      if (minDepth === null || minDepth > value.depthOfNode) {
        minDepth = value.depthOfNode;
        SearchedNode = value;
      }
    });
    return SearchedNode;
  }
  function HasSolution(array) {
    const arrForTest = array;
    let inversions = 0;
    let freePos = null;
    let resolvable = false;
    for (let i = 0; i < arrForTest.length - 1; i++) {
      if (arrForTest[i] !== (arrForTest.length - 1)) { // если не пустая клетка
        for (let j = i + 1; j < arrForTest.length; j++) {
          if (arrForTest[j] !== (arrForTest.length - 1)) { // если не пустая клетка
            inversions += (arrForTest[i] > arrForTest[j]) ? 1 : 0;
          }
        }
      } else /* if (arrForTest.length % 2 === 0) */ {
        // counter += Math.ceil((i + 1) / Math.sqrt(arrForTest.length));
        freePos = i;
      }
    }

    const freePosFromBottom = (Math.sqrt(arrForTest.length) - Math.ceil((freePos + 1) / Math.sqrt(arrForTest.length))) + 1;
    // console.log(`inversions ${inversions}; freePosFromBottom = ${freePosFromBottom}`);
    if (arrForTest.length % 2 === 0) {
      if ((inversions % 2 === 0 && freePosFromBottom % 2 !== 0) || (inversions % 2 !== 0 && freePosFromBottom % 2 === 0)) {
        resolvable = true;
      }
    } else if (inversions % 2 === 0) {
      resolvable = true;
    }
    if (resolvable) {
      alert('Поиск решения может занять длительное время.\nКак только решение будет найдено появится уведомление о завершении поиска пути к решению.\nДвижение фишек начнется после принятия уведомления');
    } else {
      alert('Текущий паззл не имеет решения. Начните новую игру');
    }

    return resolvable;
  }
  if (HasSolution(PuzzleAsArray)) {
    openList.push(MainNode);
    let counter = 0;
    // while (openList.length !== 0 /* && counter < 100000 */ && !resolved) {

    const t = setInterval(() => { // способ избавиться от зависания окна при расчетах
      let innerCounter = 0;
      while (innerCounter !== 100 && !resolved) {
        const curNode = getNodeWithMinDepth();
        const childrens = curNode.createChildNodes();
			 openList.splice(getNodeIndexInOpenList(curNode), 1);
			 closedList.push(curNode);
			 // console.log(`open: ${openList.length}; closed: ${closedList.length}`);
        for (let i = 0; i < childrens.length; i++) {
          const value = childrens[i];
          if (getNodeIndexInClosedList(value) !== null) {
            continue;
          }
          const valueIndexInOpenList = getNodeIndexInOpenList(value);
          if (value.notResolvedPos === 0) {
            resolved = true;
            clearInterval(t);
            let tmpNode = value;
            while (tmpNode.movedItem !== null) {
              solution.push(tmpNode.movedItem);
              tmpNode = tmpNode.parent;
            }

            alert(`Решение найдено за ${counter} итераций`);
            // console.log(solution.reverse());
            puzzleObj.tryToResolveAlg(solution.reverse());
            break;
          } else if (valueIndexInOpenList === null) {
            openList.push(value);
          } else if (value.depthOfNode < openList[valueIndexInOpenList].depthOfNode) {
            openList[valueIndexInOpenList].level = value.level;
            openList[valueIndexInOpenList].parent = value.parent;
          }
        }
        counter++;
        // console.log(counter);
        puzzleObj.score.textContent = `Autoplay progress: ${counter}`;
        innerCounter++;
      }
    }, 1);

    // }
    return t;
  }
  return null;
}
