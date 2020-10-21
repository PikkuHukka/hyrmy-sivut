import React from 'react'
import { connect } from 'react-redux'
import { newLike, removeBlog } from '../reducers/eventReducer'
import { createSuccessNotification, createErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'




const Index = (props) => {

  return (

    <div>
    ההה
<p>Raskaan musiikin yst{"\u00E4"}v{"\u00E4"}t!</p>
<p>Hei fuksit, vaihto-oppilaat ja muut uudet kasvot!</p>
<p>Helsingin yliopiston raskaan musiikin yst{"\u00E4"}v{"\u00E4"}t - HYRMY on Helsingin yliopiston piiriss{"\u00E4"} toimiva j{"\u00E4"}rjest{"\u00F6"}, jonka tarkoituksena on raskaan musiikin harrastajien yhdist{"\u00E4"}minen ja heid{"\u00E4"}n harrastuksensa tukeminen. HYRMY on asiaansa uskova joukko ihmisi{"\u00E4"}, joille metallimusiikki on syd{"\u00E4"}nt{"\u00E4"} l{"\u00E4"}hell{"\u00E4"}. Tervetuloa!</p>
<p>HYRMY tarjoaa j{"\u00E4"}senilleen villi{"\u00E4"} menoa ja seuraa raskaan musiikin harrastuksen kaikissa olomuodoissa. J{"\u00E4"}rjest{"\u00E4"}mme musiikinpauhuisia kerhoiltoja, henkevi{"\u00E4"} keskusteluja musiikki-iltojen muodossa, remuamme keikoilla ja festivaaleilla ja j{"\u00E4"}rjest{"\u00E4"}mme l{"\u00E4"}j{"\u00E4"}p{"\u00E4"}itt{"\u00E4"}in muuta oheistoimintaa. Jos kaipaat siskoja ja velji{"\u00E4"} el{"\u00E4"}m{"\u00E4"}n raskaalla taipaleella, me olemme j{"\u00E4"}rjest{"\u00F6"}si.</p>
<p>Alle on koostettu j{"\u00E4"}rjest{"\u00F6"}st{"\u00E4"} tiukka informaatiorutistus, joten tutustuthan siihen!</p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/JOgIRii1vuU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h3>HYRMY:n historian ja toiminnan lyhyt oppim{"\u00E4"}{"\u00E4"}r{"\u00E4"}</h3>
<p>Kaikki alkoi 26.3.2002 (ainakin virallisesti), kun HYRMY hyv{"\u00E4"}ksyttiin HYY:n alaiseksi j{"\u00E4"}rjest{"\u00F6"}ksi sen aikaisten perustajaj{"\u00E4"}senten aloitteesta. Silloin HYRMY, eli Helsingin yliopiston raskaan musiikin yst{"\u00E4"}v{"\u00E4"}t, koostui pienest{"\u00E4"} kaveriporukasta, joita yhdisti ennen kaikkea rakkaus metalliin. Nyky{"\u00E4"}{"\u00E4"}n j{"\u00E4"}rjest{"\u00F6"}{"\u00E4"} tuskin voi en{"\u00E4"}{"\u00E4"} kutsua pieneksi, sill{"\u00E4"} n{"\u00E4"}iden 18 vuoden aikana j{"\u00E4"}senm{"\u00E4"}{"\u00E4"}r{"\u00E4"} on kivunnut vain kourallisesta muutamaan sataseen. Muutos on silminn{"\u00E4"}ht{"\u00E4"}viss{"\u00E4"} j{"\u00E4"}rjest{"\u00F6"}n tapahtumissa; perustamisen aikoihin kaikki hyrmyl{"\u00E4"}iset saattoivatkin mahtua yhden saman p{"\u00F6"}yd{"\u00E4"}n {"\u00E4"}{"\u00E4"}reen keskustelemaan musiikista tuopillisen kera, mutta viime vuosina suurimmissa tapahtumissa p{"\u00F6"}yti{"\u00E4"} on ollut pakko olla useampia - istumapaikoista puhumattakaan.</p>

<p>Vaikka kasvaneet k{"\u00E4"}vij{"\u00E4"}m{"\u00E4"}{"\u00E4"}r{"\u00E4"}t ovatkin toisinaan tehneet musiikin asettamisesta keski{"\u00F6"}{"\u00F6"}n haastavaa, ja meno on sen vuoksi monessa k{"\u00E4"}{"\u00E4"}ntess{"\u00E4"} uhannut menn{"\u00E4"} pelk{"\u00E4"}n ryypp{"\u00E4"}{"\u00E4"}misen puolelle, HYRMY pit{"\u00E4"}{"\u00E4"} nyky{"\u00E4"}{"\u00E4"}n aktiivisesti huolta siit{"\u00E4"}, ett{"\u00E4"} perustajien musiikkipainotteinen visio pysyy elinvoimaisena j{"\u00E4"}rjest{"\u00F6"}n ytimess{"\u00E4"}. Kaljoittelun vastapainoksi ja vision edist{"\u00E4"}miseksi on kehitelty muunmuassa vuonna 2015 alkunsa saaneet musiikki-illat, joissa painopiste lep{"\u00E4"}{"\u00E4"} ensisijaisesti musiikin kuuntelussa ja siit{"\u00E4"} keskustelemisessa. Muita musiikkipainotteisia tapahtumia ovat esimerkiksi keikkaetkot, joista voi hakea hyv{"\u00E4"}n noususuhdanteen ja seuran milloin mink{"\u00E4"}kin b{"\u00E4"}ndin keikalle. J{"\u00E4"}rjest{"\u00F6"}lle on kertynyt my{"\u00F6"}s jonkinlaista kokemusta keikkaj{"\u00E4"}rjest{"\u00E4"}j{"\u00E4"}n{"\u00E4"} toimimisesta, joskin tuo toiminta on viime vuosina j{"\u00E4"}{"\u00E4"}nyt enemm{"\u00E4"}n taka-alalle. Huhut kuitenkin kertovat, ett{"\u00E4"} keikkatoimintaa olisi tarkoitus her{"\u00E4"}tell{"\u00E4"} j{"\u00E4"}lleen eloon, kunhan olosuhteet sen joskus sallivat.</p>
<p>J{"\u00E4"}senm{"\u00E4"}{"\u00E4"}r{"\u00E4"}n kasvusta ja sen tuomista muutoksista huolimatta yksi asia on aina pysynyt ja tulee pysym{"\u00E4"}{"\u00E4"}n tulevinakin vuosina samana: rakkaus metalliin. T{"\u00E4"}m{"\u00E4"}n yhdist{"\u00E4"}v{"\u00E4"}n tekij{"\u00E4"}n vuoksi ei tarvitse huolehtia siit{"\u00E4"}, etteik{"\u00F6"} tapahtumissa l{"\u00F6"}ytyisi jotain seuraa ja keskustelunaihetta. Ei v{"\u00E4"}li{"\u00E4"} sill{"\u00E4"}, mist{"\u00E4"} genreist{"\u00E4"} pid{"\u00E4"}t, mist{"\u00E4"} maasta olet kotoisin tai mit{"\u00E4"} p{"\u00E4"}{"\u00E4"}ainetta opiskelet - kaikki metallimusiikkiin intohimoisesti suhtautuvat ovat tervetulleita HYRMY:yn!</p>

</div>
  )
}



export default (Index)
