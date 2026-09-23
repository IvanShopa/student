fetch("index.json").then(response => response.json()).then(database => {
  const ivsh_app = document.querySelector("ivsh-app")

  function pageHome() {
    document.title = `Головна`

    ivsh_app.innerHTML = `
      <ivsh-navigate>
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <ivsh-text>Група:</ivsh-text>
        <!-- SELECT g.*
        FROM group AS g -->
        ${database.group.map(g =>
          `<a class="ivsh-button" href="#group=${g.id}">${g.name}</a>`
        ).join("")}
      </ivsh-main>
    `
  }

  function pageMenu(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    document.title = group.name
    
    ivsh_app.innerHTML = `
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <a class="ivsh-button" href="#group=${group.id}&menu=0">Викладачі</a>
        <a class="ivsh-button" href="#group=${group.id}&menu=1">Дисципліни</a>
        <a class="ivsh-button" href="#group=${group.id}&menu=2">Календар</a>
        <a class="ivsh-button" href="#group=${group.id}&menu=3">Одногрупники</a>
        <a class="ivsh-button" href="#group=${group.id}&menu=4">Розклад</a>
      </ivsh-main>
    `
  }

  function pageTeachers(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    // SELECT te.*
    // FROM group_teacher AS g_te
    // JOIN teacher AS te
    // ON te.id = g_te.teacher
    // WHERE g_te.group = id_group
    const teacher = database.group_teacher.filter(g_te =>
      g_te.group == id_group
    ).map(g_te =>
      database.teacher.find(te =>
        te.id == g_te.teacher
      )
    )

    document.title = `Викладачі`

    ivsh_app.innerHTML = `
      <style>
        th, td {
          width: 20%
        }
        td:nth-child(3),
        td:nth-child(5) {
          text-align: center
        }
      </style>
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        <a class="ivsh-link" href="#group=${group.id}">${group.name}</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Викладач</th>
                <th>Telegram</th>
                <th>Телефон</th>
                <th>Mail</th>
                <th>ДДМА</th>
              </tr>
            </thead>
            <tbody>
              ${teacher.map(te =>
                `<tr>
                  <td>${te.name}</td>
                  <td>${te.telegram &&
                    `<a class="ivsh-link" href="https://t.me/${te.telegram}" target="_blank">
                      @${te.telegram}
                    </a>`
                  }</td>
                  <td>${te.telephone &&
                    `<a class="ivsh-link" href="tel:${te.telephone}" target="_blank">
                      ${te.telephone}
                    </a>`
                  }</td>
                  <td>${te.mail &&
                    `<a class="ivsh-link" href="mailto:${te.mail}" target="_blank">
                      @${te.mail}
                    </a>`
                  }</td>
                  <td>${te.url_dsma &&
                    `<a class="ivsh-link" href="http://www.ddma.edu.ua/${te.url_dsma}.html" target="_blank">
                      Посилання
                    </a>`
                  }</td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </ivsh-box-table>
      </ivsh-main>
    `
  }

  function pageSubjects(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    // SELECT su.*
    // FROM group_subject AS g_su
    // JOIN subject AS te
    // ON su.id = g_su.subject
    // WHERE g_su.group = id_group
    const subject = database.group_subject.filter(g_su =>
      g_su.group == id_group
    ).map(g_su =>
      database.subject.find(su =>
        su.id == g_su.subject
      )
    )
    
    document.title = `Дисципліни`
    
    ivsh_app.innerHTML = `
      <style>
        th, td {
          width: 33.3%
        }
        td:nth-child(3) {
          text-align: center
        }
      </style>
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        <a class="ivsh-link" href="#group=${group.id}">${group.name}</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Дисципліна</th>
                <th>Чат</th>
                <th>MoodleDDMA</th>
              </tr>
            </thead>
            <tbody>
              ${subject.map(su =>
                `<tr>
                  <td>${su.name}</td>
                  <td>${su.url_chat && su.name_chat &&
                    `<a class="ivsh-link" href="${su.url_chat}" target="_blank">
                      ${su.name_chat}
                    </a>`
                  }</td>
                  <td>${su.url_moodleddma &&
                    `<a class="ivsh-link" href="http://moodle-new.ddma.edu.ua/course/view.php?id=${su.url_moodleddma}" target="_blank">
                      Посилання
                    </a>`
                  }</td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </ivsh-box-table>
      </ivsh-main>
    `
  }

  function pageCalendar(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    document.title = `Календар`
    
    ivsh_app.innerHTML = `
      <style>
        th, td {
          width: 12.3%
        }
        td {
          text-align: center
        }
      </style>
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        <a class="ivsh-link" href="#group=${group.id}">${group.name}</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <ivsh-text>Вересень</ivsh-text>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Тиждень</th>
                <th>Понеділок</th>
                <th>Вівторок</th>
                <th>Середа</th>
                <th>Четвер</th>
                <th>П’ятниця</th>
                <th>Субота</th>
                <th>Неділя</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
              <tr><td></td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td></tr>
              <tr><td>/ 1 /</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
              <tr><td>* 2 *</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td></tr>
              <tr><td>/ 3 /</td><td>28</td><td>29</td><td>30</td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </ivsh-box-table>
        <ivsh-text>Жовтень</ivsh-text>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Тиждень</th>
                <th>Понеділок</th>
                <th>Вівторок</th>
                <th>Середа</th>
                <th>Четвер</th>
                <th>П’ятниця</th>
                <th>Субота</th>
                <th>Неділя</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>/ 3 /</td><td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
              <tr><td>* 4 *</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
              <tr><td>/ 5 /</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
              <tr><td>* 6 *</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
              <tr><td>/ 7 /</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td></tr>
            </tbody>
          </table>
        </ivsh-box-table>
        <ivsh-text>Листопад</ivsh-text>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Тиждень</th>
                <th>Понеділок</th>
                <th>Вівторок</th>
                <th>Середа</th>
                <th>Четвер</th>
                <th>П’ятниця</th>
                <th>Субота</th>
                <th>Неділя</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>/ 7 /</td><td></td><td></td><td></td><td></td><td></td><td></td><td>1</td></tr>
              <tr><td>* 8 *</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
              <tr><td>/ 9 /</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
              <tr><td>* 10 *</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td></tr>
              <tr><td>/ 11 /</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr>
              <tr><td>* 12 *</td><td>30</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </ivsh-box-table>
        <ivsh-text>Грудень</ivsh-text>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>Тиждень</th>
                <th>Понеділок</th>
                <th>Вівторок</th>
                <th>Середа</th>
                <th>Четвер</th>
                <th>П’ятниця</th>
                <th>Субота</th>
                <th>Неділя</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>* 12 *</td><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
              <tr><td>/ 13 /</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td></tr>
              <tr><td>* 14 *</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td></tr>
              <tr><td>/ 15 /</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td></tr>
              <tr><td>* 16 *</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </ivsh-box-table>
      </ivsh-main>
    `
  }

  function pageStudents(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    // SELECT st.*
    // FROM group_student AS g_st
    // JOIN student AS st
    // ON st.id = g_st.student
    // WHERE g_st.group = id_group
    const student = database.group_student.filter(g_st =>
      g_st.group == id_group
    ).map(g_st =>
      database.student.find(st =>
        st.id == g_st.student
      )
    )

    document.title = `Одногрупники`
    
    ivsh_app.innerHTML = `
      <style>
        th:nth-child(1),
        td:nth-child(1) {
          width: 2%
        }
        td:nth-child(1) {
          text-align: center
        }
        th:nth-child(2),
        td:nth-child(2),
        th:nth-child(3),
        td:nth-child(3) {
          width: 49%
        }
      </style>
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        <a class="ivsh-link" href="#group=${group.id}">${group.name}</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <ivsh-box-table>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Одногрупник</th>
                <th>Telegram</th>
              </tr>
            </thead>
            <tbody>
              ${student.map(st =>
                `<tr>
                  <td>${st.n}</td>
                  <td>${st.name}</td>
                  <td>${st.telegram &&
                    `<a class="ivsh-link" href="https://t.me/${st.telegram}" target="_blank">
                      @${st.telegram}
                    </a>`
                  }</td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </ivsh-box-table>
      </ivsh-main>
    `
  }

  function pageSchedule(id_group) {
    // SELECT g.*
    // FROM group AS g
    // WHERE g.id = id_group
    const group = database.group.find(g => g.id == id_group)

    // SELECT sl.*
    // FROM schedulelesson AS sl
    // WHERE sl.group = id_group
    const schedulelesson = database.schedulelesson.filter(sl => sl.group == id_group)
    
    document.title = `Розклад`
    
    ivsh_app.innerHTML = `
      <style>
        th:nth-child(3),
        td:nth-child(3),
        th:nth-child(4),
        td:nth-child(4) {
          width: 47%
        }
        td:nth-child(1),
        td:nth-child(2) {
          text-align: center
        }
      </style>
      <ivsh-navigate>
        <a class="ivsh-link" href="#">Головна</a> /
        <a class="ivsh-link" href="#group=${group.id}">${group.name}</a> /
        ${document.title}
      </ivsh-navigate>
      <ivsh-main>
        <!-- SELECT w.*
        FROM week AS w -->
        ${database.week.map(w =>
          `<ivsh-text>Тиждень: ${w.name}, ${w.short}</ivsh-text>
          <!-- SELECT d.*
          FROM day AS d -->
          ${database.day.map(d =>
            `<ivsh-text>${d.name}</ivsh-text>
            <ivsh-box-table>
              <table>
                <thead>
                  <tr>
                    <th>Пара</th>
                    <th>Час</th>
                    <th>Дисципліна</th>
                    <th>Викладач</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- SELECT sb.*
                  FROM schedulebell AS sb
                  WHERE sb.day = d.id -->
                  ${database.schedulebell.filter(sb => sb.day == d.id).map(sb =>
                    `<tr>
                      <!-- SELECT le.value
                      FROM lesson AS le
                      WHERE le.id = sb.lesson -->
                      <td>${database.lesson.find(le => le.id == sb.lesson).value}</td>
                      <!-- SELECT ti.value
                      FROM time AS ti
                      WHERE ti.id = sb.time -->
                      <td>${database.time.find(ti => ti.id == sb.time).value}</td>
                      <td>${schedulelesson.filter(sl =>
                        sl.week == w.id && sl.schedulebell == sb.id
                      ).map(sl =>
                        `<!-- SELECT li.url
                        FROM link AS li
                        WHERE li.id = sl.link -->
                        <a class="ivsh-link" href="${database.link.find(li => li.id == sl.link).url}" target="_blank">
                          <!-- SELECT su.name
                          FROM subject AS su
                          WHERE su.id = sl.subject -->
                          ${database.subject.find(su => su.id == sl.subject).name}
                          <!-- SELECT ty.short
                          FROM type AS ty
                          WHERE ty.id = sl.type -->
                          (${database.type.find(ty => ty.id == sl.type).short})
                        </a>`
                      ).join("")}</td>
                      <td>${schedulelesson.filter(sl =>
                        sl.week == w.id && sl.schedulebell == sb.id
                      ).map(sl =>
                        `<!-- SELECT te.name
                        FROM teacher AS te
                        WHERE te.id = sl.teacher -->
                        ${database.teacher.find(te => te.id == sl.teacher).name}`
                      ).join("")}</td>
                    </tr>`
                  ).join("")}
                </tbody>
              </table>
            </ivsh-box-table>`
          ).join("")}`
        ).join("")}
      </ivsh-main>
    `
  }

  function main() {
    const hash = location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const group = params.get("group")
    const menu = params.get("menu")
    if (group == null && menu == null) pageHome()
    else if (group != null && menu == null) pageMenu(group)
    else if (group != null && menu == 0) pageTeachers(group)
    else if (group != null && menu == 1) pageSubjects(group)
    else if (group != null && menu == 2) pageCalendar(group)
    else if (group != null && menu == 3) pageStudents(group)
    else if (group != null && menu == 4) pageSchedule(group)
  }

  addEventListener("hashchange", main)

  main()
})