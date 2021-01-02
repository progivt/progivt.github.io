---
id: js06game
title: Игровые проекты ИВТ-20
---


export const Screencap = ({children, title, num, file='/'}) => ( <div style={{
    textAlign: 'center',
    display: 'inline-block',
    margin: '0px 11px 32px 10px',
    width: '256px'
  }}><a target='_self' href={ (file.slice(0,7)=='http://' || file.slice(0,8)=='https://' ) ? file : 'http://progivt.github.io/ivt20games/' + num + file } ><img style={{ width:'256px', height: '256px' }} src={'http://progivt.github.io/ivt20games/' + num + '.png'} /><br />
    { title }</a><br/><em style={{ fontSize: '80%' }}>{ children }</em></div> );


<Screencap num="01" title="Flappy SVFU">Григорьева Кюннэй, Иванова Сайаана, Абрамова Ньургуйаана</Screencap>
<Screencap num="02" title="Змейка">Евсеев Сергей<br />&nbsp;</Screencap>
<Screencap num="03" title="SpaceWars">Петров Андрей, Федоров Юрий, Афанасьев Айсен</Screencap>
<Screencap num="04" title="Ещё змейка">Андросов Леонид, Степанов Николай, Михайлов Айсиэн</Screencap>
<Screencap num="05" file="/mainMenu.html" title="SNAKE">Рожина Диана, Ефимов Алексей</Screencap>
<Screencap num="06" file="https://github.com/ihmankind/platformer" title="Platformer@GitHub">Эверстов Александр, Стручков Василий</Screencap>
<Screencap num="07" title="Медвежонок">Иванов Даниил, Данилова Люба, Ксенофонтов Эдгард</Screencap>
<Screencap num="08" title="Зубочистка">Макаров Захар, Суздалов Леонтий, Ульянов Никита</Screencap>
<Screencap num="09" title="Злая пуля">Местников Айдын, Акимов Юрий, Беляев Уйгун</Screencap>
<Screencap num="10" title="Найди чороон">Апросимова Айаана, Тагрова Дарина, Петров Леонид</Screencap>
<Screencap num="11" title="Back4KFEN">Пономарев Сергей, Романов Уйгун, Соловьев Марк </Screencap>
<Screencap num="12" file="https://github.com/victor-ivanov-ivt20-2/Game" title="Олонхо@GitHub">Иванов Виктор, Ипполитов Евгений, Константинов Анатолий</Screencap>
<Screencap num="13" title="2nd Chance">Ефимова Валерия</Screencap>
<Screencap num="14" title="Первый день в КФЕНе">Говорова Дайаана, Платонова Светлана</Screencap>
