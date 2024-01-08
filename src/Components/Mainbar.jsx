import React, { useState, useEffect } from 'react';
import styles from '../Styles/Mainbar.module.css';
import Acceptinput from './Acceptinput';
import Bg from '../Assets/Bg.png';
import Lock from '../Assets/Lock.png';
import disable from '../Assets/disable.png';
import Enable from '../Assets/Enable.png';
import mobilesend from '../Assets/mobilesend.png';
import Ellipse from '../Assets/Ellipse.png';
import Backarrow from '../Assets/Backarrow.png';
import send from '../Assets/send.mp3';
import tap from '../Assets/tap.mp3';
import popup from '../Assets/popup.mp3';

function Mainbar() {

  let [buttonpopup, setbuttonpopup] = useState(false);
  let [condition, setcondition] = useState(true);
  let [pic, setpic] = useState(true);
  let [image, setimage] = useState(disable);
  let [image2, setimage2] = useState(mobilesend);
  let [shownotes, setshownotes] = useState(false);
  let [iid, setiid] = useState();
  let [title, settitle] = useState("");
  let [bgcolor, setbgcolor] = useState("");
  let [initials, setinitials] = useState("");
  let typednote;
  let [display, setdisplay] = useState([]);
  let [count, setcount] = useState(true);
  let storedData = {};
  let [con, setcon] = useState([]);

  useEffect(() => {

    const getNotes = () => {
      storedData = localStorage.getItem("Gn");
      if (storedData !== null) {
        setcondition(true);
        setdisplay(JSON.parse(storedData));
      }
      else {
        const newarray = [];
        localStorage.setItem("Gn", JSON.stringify(newarray));
        let array = ['00'];
        localStorage.setItem("index", JSON.stringify(array));
        const names = [" "];
        localStorage.setItem("storename", JSON.stringify(names));
      }
    }
    getNotes();
  }, []);

  useEffect(() => {
    let stored = localStorage.getItem("Gn");
    setcondition(true);
    setdisplay(JSON.parse(stored));
  }, [count]);

  const popupbox = () => {
    setbuttonpopup(true);
    setcondition(true);
    setshownotes(false);
    new Audio(popup).play();
  }

  const handlechange = (e) => {
    if (e.target.value == '') {
      setimage(disable);
      setimage2(mobilesend);
    }
    else {
      setimage(Enable);
      setimage2(Enable);
    }
    typednote = e.target.value;
  }

  const opennotes = (show, a, b, c) => {

    setiid(show);
    let notes = localStorage.getItem(show);
    setcon(JSON.parse(notes));
    setpic(false);
    setbgcolor(a);
    setinitials(b);
    settitle(c);
    setshownotes(true);
    new Audio(tap).play();
  }

  const storenotes = () => {
    console.log(iid);
    setimage(disable);
    if (typednote == "" || typednote === undefined) {
      alert('Please type something to store as a note!');
      return;
    }

    new Audio(send).play();

    console.log(typednote);

    let group = JSON.parse(localStorage.getItem(iid));
    console.log(group);

    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = " " + date + " " + month + " " + year + " ";
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    group.push(typednote + currentDate + time);
    localStorage.setItem(iid, JSON.stringify(group));
    document.getElementById('Note').value = "";
    typednote = "";
    console.log(typednote);
    setcon(JSON.parse(localStorage.getItem(iid)));
  }

  const storenotes2 = () => {

    console.log(iid);
    setimage2(mobilesend);
    if (typednote == "" || typednote === undefined) {
      alert('Please type something to store as a note!');
      return;
    }

    new Audio(send).play();

    console.log(typednote);

    let group = JSON.parse(localStorage.getItem(iid));
    console.log(group);

    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = " " + date + " " + month + " " + year + " ";
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    group.push(typednote + currentDate + time);
    localStorage.setItem(iid, JSON.stringify(group));
    document.getElementById('Note2').value = "";
    typednote = "";
    console.log(typednote);
    setcon(JSON.parse(localStorage.getItem(iid)));
  }


  return (
    <div>

      <div className={styles.title}>Pocket Notes</div>
      <div className={styles.addbtn} onClick={() => popupbox()}><div className={styles.btn} style={{ cursor: 'pointer' }}>
        +</div></div>
      {condition ?
        <div className={styles.showinfo}>

          {display.map((display) => (

            <div className={styles.onhover} onClick={() => opennotes(display.substring(0, 2),
              display.substring(2, 9), display.substring(9, 11), display.substring(11, display.length))}>&ensp;<br />&nbsp;
              <span className={styles.user1} style={{ background: display.substring(2, 9) }}>
                {display.substring(9, 11)}
              </span>&emsp;
              <span className={styles.user}>
                {display.substring(11, display.length)}
              </span>

            </div>

          ))}

        </div>
        : ""}
      {pic ?
        <div className={styles.pic}>
          <img src={Bg} alt='' className={styles.bg} />
          <div className={styles.topic}>Pocket Notes</div>
          <div className={styles.desc}>
            Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </div>
          <img src={Lock} alt='' className={styles.lock} />
          <div className={styles.encryption}>end-to-end encrypted</div>
        </div>
        :
        <div className={styles.pic}>
          <div className={styles.textarealayout}>
            <textarea className={styles.design}
              placeholder='Enter your text here...........' id='Note' onChange={(e) => { handlechange(e) }} >
            </textarea>
          </div>
          <img src={image} alt='abc' className={styles.send} onClick={() => storenotes()}></img>
        </div>
      }
      {shownotes ?
        <>
          <div className={styles.topbar} >
            <img src={Backarrow} alt='' className={styles.backarrow} onClick={() => {
              setshownotes(false);
              setcondition(true);
            }}></img>
            <div className={styles.initials} style={{ background: bgcolor }}>{initials}</div>
          </div>
          <div className={styles.heading}>{title}</div>
          <div className={styles.scrollarea}>
            {con.map((con) => (
              <>
                <div className={styles.gap} />
                <div className={styles.sizing}><br />
                  <div className={styles.notes}>{con.substring(0, con.length - 20)}</div><br /><br />
                  <div className={styles.dateandtime}>
                    {con.substring(con.length - 20, con.length - 9)}&emsp;
                    <img src={Ellipse} className={styles.ellipse} alt='' />&emsp;
                    {con.substring(con.length - 9)}
                    <div className={styles.gap2} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className={styles.pic2}>
            <div className={styles.textarealayout2}>
              <textarea className={styles.design2}
                placeholder='Enter your text here...........' id='Note2' onChange={(e) => { handlechange(e) }} >
              </textarea>
            </div>
            <img src={image2} alt='abc' className={styles.send2} onClick={() => { storenotes2() }}></img>
          </div>
        </>
        :
        ""
      }
      <Acceptinput trigger={buttonpopup} settrigger={setbuttonpopup} storein={count} setstorein={setcount} />

    </div>
  )
}

export default Mainbar;