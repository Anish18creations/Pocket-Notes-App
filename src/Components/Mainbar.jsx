import React, { useState, useEffect} from 'react';
import styles from '../Styles/Mainbar.module.css';
import Acceptinput from './Acceptinput';
import Bg from '../Assets/Bg.png';
import Lock from '../Assets/Lock.png';
import disable from '../Assets/disable.png';
import Enable from '../Assets/Enable.png';
import Ellipse from '../Assets/Ellipse.png';

function Mainbar() {

  let [buttonpopup, setbuttonpopup] = useState(false);
  let [condition, setcondition] = useState(true);
  let [pic, setpic] = useState(true);
  let [image, setimage] = useState(disable);
  let [shownotes, setshownotes] = useState(false);
  let [iid, setiid] = useState();
  let [title, settitle] = useState("");
  let [bgcolor, setbgcolor] = useState("");
  let [initials, setinitials] = useState("");
  let typednote;
  let [display, setdisplay] = useState([]);
  let [count, setcount] = useState(true);
  let storedData = {};

  

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
  },[]);

  useEffect(() => {
    let stored = localStorage.getItem("Gn");
    setcondition(true);
    setdisplay(JSON.parse(stored));
  },[count]);

  const popupbox = () => {
    setbuttonpopup(true);
    setcondition(true);
    setshownotes(false);
    const interests = localStorage.getItem("Gn");
    setdisplay(JSON.parse(interests));
  }


  const handlechange = (e) => {
    if (e.target.value == '')
      setimage(disable)
    else
      setimage(Enable);
    typednote = e.target.value;
  }


  let [con, setcon] = useState([]);
  const opennotes = (show, a, b, c) => {

    setiid(show);
    let notes = localStorage.getItem(show);
    setcon(JSON.parse(notes));
    setpic(false);
    setbgcolor(a);
    setinitials(b);
    settitle(c);
    setshownotes(true);
  }

  const storenotes = () => {
    console.log(iid);
    setimage(disable);
    if (typednote == "" || typednote === undefined) {
      alert('Please type something to store as a note!');
      return;
    }
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
    setcon(JSON.parse(localStorage.getItem(iid)));
  }


  return (
    <div>
      <div className={styles.title}>Pocket Notes</div>
      <div className={styles.addbtn} onClick={() => popupbox()}><div className={styles.btn} style={{ cursor: 'pointer' }}>
        +</div></div>
      {condition ?
        <div className={styles.scrollbar} style={{
          position: 'absolute', top: '15vh', width: '28vw', height: '70vh', overflowX: 'hidden',
          overflowY: 'scroll', outline: 'none'
        }}>

          {display.map((display) => (

            <div style={{ height: '11vh' }} className={styles.onhover} onClick={() => opennotes(display.substring(0, 2),
              display.substring(2, 9), display.substring(9, 11), display.substring(11, display.length))}>&ensp;<br />&nbsp;
              <span className={styles.user1} style={{ background: display.substring(2, 9), borderRadius: '50%' }}>
                {display.substring(9, 11)}
              </span>&emsp;
              <span className={styles.user} style={{ color: 'black', fontSize: '24px' }}>
                {display.substring(11, display.length)}
              </span>

            </div>

          ))}

        </div>
        : ""}

      {pic ?
        <div style={{ position: 'absolute', left: '28vw', width: '72vw', height: '100vh', background: '#DAE5F5' }}>
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
        <div style={{ position: 'absolute', left: '28vw', width: '72vw', height: '100vh', background: '#DAE5F5' }}>
          <div style={{
            position: 'absolute', width: '69.8vw', height: '30vh', background: '#001F8B', bottom: '0vh'
            , borderStyle: 'solid', borderWidth: '1px', borderRadius: '9px', borderColor: '#001F8B', padding: '1vw'
          }}>
            <textarea style={{
              position: 'absolute', width: '66.5vw', height: '24vh',
              background: 'white', borderStyle: 'solid', borderWidth: '1px', borderRadius: '9px', borderColor: '#CCCCCC',
              cursor: 'default'
            }}
              placeholder='Enter your text here...........' id='Note' onChange={(e) => { handlechange(e) }} >

            </textarea>
          </div>
          <img src={image} alt='abc' style={{ position: 'absolute', right: '2vw', bottom: '5vh', cursor: 'pointer' }}
            onClick={() => storenotes()}></img>
        </div>
      }
      {shownotes ?
        <>
          <div style={{
            position: 'absolute', left: '28vw', width: '72vw', height: '9vh', background: '#001F8B',
            cursor: 'default'
          }} />
          <div>
            <div style={{ position: 'absolute', left: '35vw', color: 'white', width: '20vw', top: '2vh', cursor: 'default' }}
              className={styles.heading}>{title}</div>
            <span style={{
              position: 'absolute', left: '30vw', width: '3vw', height: '4vh', background: bgcolor, top: '1.5vh',
              borderRadius: '50%', cursor: 'default', padding: '5px'
            }} className={styles.initials}>{initials}</span>
          </div>
          <div style={{
            position: 'absolute', left: '30vw', top: '9vh', width: '70vw', height: '56vh',
            overflowX: 'hidden', overflowY: 'scroll', outline: 'none'
          }}>
            {con.map((con) => (
              <>
                <div style={{ height: '5vh' }} />
                <div className={styles.sizing}><br />
                  <div className={styles.notes}>{con.substring(0, con.length - 21)}</div><br /><br />

                  <div>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    &emsp;



                    <span className={styles.dateandtime}>{con.substring(con.length - 20, con.length - 9)}</span>&emsp;
                    &emsp;
                    <span><img src={Ellipse} alt='' /></span>&emsp;&emsp;
                    <span className={styles.dateandtime}>{con.substring(con.length - 9)}</span></div>
                  <div style={{ height: '2vh' }}></div>
                </div>
              </>
            ))}
          </div>
        </>
        :
        ""
      }
      <Acceptinput trigger={buttonpopup} settrigger={setbuttonpopup} storein={count} setstorein={setcount}/>

    </div>
  )
}

export default Mainbar;