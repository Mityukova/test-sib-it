function onPageLoaded() {
  var sumInv = document.querySelector(".sumInv");

  var customSlider = document.getElementById("customSlider");
  var errorMessageSum = document.getElementById("errorMessageSum");
  var errorMessageLoss = document.getElementById("errorMessageLoss");
  var errorMessageProfit = document.getElementById("errorMessageProfit");

  var mult = document.querySelector(".mult");
  var slider = document.querySelector(".slider");
  var profit_i = document.querySelector(".profit_i");
  var loss_i = document.querySelector(".loss_i");
  var msgProfit = document.querySelector(".msgProfit");
  var msgLoss = document.querySelector(".msgLoss");
  var investment = document.querySelector(".investment");
  var chk = document.getElementById("input[id=loss]");
  var customPart = document.querySelector(".customPart");
  var makeSign1 = document.getElementById("makeSign1");
  var makeSign2 = document.getElementById("makeSign2");
  var radios = document.getElementsByName("restrictions");
  var chk = document.getElementsByName("chk");
  var b1 = document.querySelector(".b1");
  var b2 = document.querySelector(".b2");
  var b3 = document.querySelector(".b3");
  var b4 = document.querySelector(".b4");
  const summary = document.querySelector("summary");
  const details = document.querySelector("details");
  var reduction = document.querySelector(".reduction");
  var growth = document.querySelector(".growth");
  var restrFlag = true;
  var defaultRest = (3 / 10) * parseInt(sumInv.value, 10);
  var sumInv_f, mult_f, direction;
  var errorCheck = [0, 0, 0, 0];

  sumInv.addEventListener("change", function () {
    if (sumInv.value > 200000) sumInv.value = 200000;
    if (sumInv.value < 100) {
      addErr(sumInv, errorMessageSum);
      errorCheck[0] = 1;
    } else {
      deleteErr(sumInv, errorMessageSum);
      updateLabel();
      updateProfitLoss(true);
      errorCheck[0] = 0;
    }
  });

  function addErr(element, block) {
    element.classList.add("error");
    block.style.visibility = "visible";
  }

  function deleteErr(element, block) {
    element.classList.remove("error");
    block.style.visibility = "hidden";
  }

  mult.addEventListener("click", function () {
    if (customSlider.style.visibility == "visible") {
      customSlider.style.visibility = "hidden";
    } else customSlider.style.visibility = "visible";
  });

  slider.addEventListener("change", function () {
    changeSlider();
  });

  function changeSlider() {
    customPart.style.width = (parseInt(slider.value, 10) / 40) * 230 - 5 + "px";
    mult.value = slider.value;
    updateLabel();
    checkMult();
  }
  mult.addEventListener("change", function () {
    slider.value = mult.value;
    updateLabel();
    checkMult();
    changeSlider();
  });

  function checkMult() {
    if ((mult.value < 1) | (mult.value > 40)) {
      addErr(mult, errorMessageMult);
      errorCheck[1] = 1;
    } else {
      deleteErr(mult, errorMessageMult);
      errorCheck[1] = 0;
    }
  }

  profit_i.addEventListener("change", function () {
    checkProfit();
  });

  function checkProfit() {
    if ((restrFlag & (profit_i.value < parseInt(sumInv.value, 10) / 10)) | (!restrFlag & (profit_i.value < 10))) {
      addErr(profit_i, errorMessageProfit);
      errorCheck[2] = 1;
      if (restrFlag) {
        msgProfit.innerHTML = "$" + parseInt(sumInv.value, 10) / 10;
      } else {
        msgProfit.innerHTML = "10%";
      }
    } else {
      deleteErr(profit_i, errorMessageProfit);
      errorCheck[2] = 0;
    }
  }

  loss_i.addEventListener("change", function () {
    checkLoss();
  });

  function checkLoss() {
    if ((restrFlag & (loss_i.value < parseInt(sumInv.value, 10) / 10)) | (!restrFlag & (loss_i.value < 10))) {
      console.log(9);
      addErr(loss_i, errorMessageLoss);

      errorCheck[3] = 1;

      if (restrFlag) {
        msgLoss.innerHTML = "<span class='nodecor'>меньше</span> $ " + parseInt(sumInv.value, 10) / 10;
      } else {
        msgLoss.innerHTML = "<span class='nodecor'>меньше</span> 10%";
      }
    } else {
      if (
        (restrFlag & (parseInt(loss_i.value, 10) > parseInt(sumInv.value, 10))) |
        (!restrFlag & (loss_i.value > 100))
      ) {
        if (restrFlag) {
          msgLoss.innerHTML = "<span class='nodecor'>больше</span> $ " + sumInv.value;
          addErr(loss_i, errorMessageLoss);
          errorCheck[3] = 1;
        } else {
          msgLoss.innerHTML = "<span class='nodecor'>больше</span> 100%";
          addErr(loss_i, errorMessageLoss);
          errorCheck[3] = 1;
        }
      } else {
        console.log(0);
        deleteErr(loss_i, errorMessageLoss);
        errorCheck[3] = 0;
      }
    }
  }

  function updateLabel() {
    var investmentValue = parseInt(sumInv.value, 10) * parseInt(slider.value, 10);
    investment.innerHTML = "= $" + investmentValue.toLocaleString();
  }

  radios.forEach(function (elem) {
    elem.addEventListener("click", function () {
      //%

      if (radios[0].checked) {
        restrFlag = false;
        makeSignRestr(radios[0].value);
      } else {
        restrFlag = true;
        makeSignRestr(radios[1].value);
      }
    });
  });

  function makeSignRestr(sign) {
    makeSign1.innerHTML = sign;
    makeSign2.innerHTML = sign;
    updateProfitLoss(true);
  }

  chk.forEach(function (elem) {
    elem.addEventListener("click", function () {
      if (elem.checked) {
        document.querySelector("." + elem.value).removeAttribute("disabled");
        updateProfitLoss(false);
      } else {
        document.querySelector("." + elem.value).setAttribute("disabled", "");
      }
      checkButtons();
    });
  });

  function updateProfitLoss(redo) {
    if (restrFlag) {
      defaultRest = (3 / 10) * parseInt(sumInv.value, 10);
    } else {
      defaultRest = parseInt(30, 10);
    }

    if (chk[0].checked & (redo | (document.querySelector("." + chk[0].value).value == "")))
      document.querySelector("." + chk[0].value).value = defaultRest;
    if (chk[1].checked & (redo | (document.querySelector("." + chk[1].value).value == "")))
      document.querySelector("." + chk[1].value).value = defaultRest;
  }

  function checkButtons() {
    if (chk[0].checked) {
      b1.removeAttribute("disabled");
      b2.removeAttribute("disabled");
      b1.style.cursor = "pointer";
      b2.style.cursor = "pointer";
      checkProfit();
    } else {
      b1.setAttribute("disabled", "");
      b2.setAttribute("disabled", "");
      b1.style.cursor = "initial";
      b2.style.cursor = "initial";
      deleteErr(profit_i, errorMessageProfit);
      errorCheck[2] = 0;
    }
    if (chk[1].checked) {
      b3.removeAttribute("disabled");
      b4.removeAttribute("disabled");
      b3.style.cursor = "pointer";
      b4.style.cursor = "pointer";
      checkLoss();
    } else {
      b3.setAttribute("disabled", "");
      b4.setAttribute("disabled", "");
      b3.style.cursor = "initial";
      b4.style.cursor = "initial";
      deleteErr(loss_i, errorMessageLoss);
      errorCheck[3] = 0;
    }
  }

  b1.addEventListener("click", function () {
    checkProfit();
    profit_i.value = parseInt(profit_i.value, 10) + 1;
  });
  b2.addEventListener("click", function () {
    profit_i.value = parseInt(profit_i.value, 10) - 1;
    checkProfit();
  });
  b3.addEventListener("click", function () {
    loss_i.value = parseInt(loss_i.value, 10) + 1;
    checkLoss();
  });
  b4.addEventListener("click", function () {
    loss_i.value = parseInt(loss_i.value, 10) - 1;
    checkLoss();
  });

  summary.addEventListener("click", function () {
    if (details.open) {
      deleteErr(loss_i, errorMessageLoss);
      deleteErr(profit_i, errorMessageProfit);
      // errorCheck[2] = 0;
      // errorCheck[3] = 0;
    } else {
      openflag = true;
      checkButtons();
    }
    console.log(openflag);
  });

  //работа с нажатием кнопок клавиатуры

  reduction.addEventListener("click", function () {
    finalData("reduction");
  });

  growth.addEventListener("click", function () {
    finalData("growth");
  });

  sumInv.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      mult.focus();
    }
  });
  mult.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      profit_i.focus();
      customSlider.style.visibility = "hidden";
    }
  });
  profit_i.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      loss_i.focus();
    }
  });

  function onlyNumbers(elem) {
    elem.addEventListener("keydown", function (event) {
      if (
        event.keyCode == 46 ||
        event.keyCode == 8 ||
        event.keyCode == 9 ||
        event.keyCode == 27 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode >= 35 && event.keyCode <= 39)
      ) {
        return;
      } else {
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
          event.preventDefault();
        }
      }
    });
  }

  onlyNumbers(sumInv);
  onlyNumbers(mult);
  onlyNumbers(profit_i);
  onlyNumbers(loss_i);

  //получение итоговых данных

  function finalData(dir) {
    direction = dir;
    var a = 0;
    errorCheck.forEach(function (item) {
      a = a + item;
    });
    if (a === 0) {
      sumInv_f = parseInt(sumInv.value, 10);
      mult_f = parseInt(mult.value, 10);

      console.log("sumInv= " + sumInv_f);
      console.log("mult= " + mult_f);

      if (chk[0].checked & restrFlag) {
        var takeProfit = parseInt(profit_i.value, 10);
        console.log("takeProfit= " + takeProfit);
      }

      if (chk[0].checked & !restrFlag) {
        var takeProfit = (parseInt(profit_i.value, 10) * sumInv_f) / 100;
        console.log("takeProfit= " + takeProfit);
      }
      if (chk[1].checked & restrFlag) {
        var stopLoss = parseInt(loss_i.value, 10);
        console.log("stopLoss= " + stopLoss);
      }
      if (chk[1].checked & !restrFlag) {
        var stopLoss = (parseInt(loss_i.value, 10) * sumInv_f) / 100;
        console.log("stopLoss= " + stopLoss);
      }
      console.log("direction= " + direction);
    } else {
      alert("Ошибка в данных!");
    }
  }

  const request = new XMLHttpRequest();
  const url = "ajax_quest.php";
  var params = "sumInv=" + sumInv_f + "&mult=" + mult_f;
  if (chk[0].checked) params = params + "&takeProfit=" + takeProfit;
  if (chk[1].checked) params = params + "&stopLoss=" + stopLoss;
  params = params + "&direction=" + direction;

  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
    }
  });
  request.send(params);
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
