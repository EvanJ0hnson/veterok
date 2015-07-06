<?php
  #error_reporting  (E_ALL);
  include "config.php";

  if (!isset($_GET['pswrd'])) {
    echo'
      <html>
      <head>
        <meta charset="utf-8">
        <title>Администрирование</title>
        <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
        <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
        <link rel=stylesheet href="data/PCSs.css">
      </head>
      <body>
      <center>
        <br>
        <br>
        <br>
        <form action="admin.php" method=GET name=auth>Введите пароль:
          <input class=button type=password name=pswrd>
          <input class=button type=submit value="Войти">
          <script language=JavaScript>
            document.pass.pswrd.focus();
          </script>
        </form>
      </center>';
  } else {
      if ($_GET['pswrd']=="$password") {
      // определение общего количества новостей
      $news=file('data/news.txt');
      $news_count=count($news);

      if (isset($_GET['id'])) {
        // $page=$_GET['page'];
        $id=$_GET['id'];

        if ($news_count<1) {
          print"$back. Нужно оставить хотя бы одну новость.";
          exit;
        }

        $fp = fopen("data/news.txt","w");
        flock ($fp, LOCK_EX);
        unset($news[$id]);
        fputs($fp, implode("", $news));
        flock($fp, LOCK_UN);
        fclose($fp);

        Header("Location: admin.php?pswrd=$password");
        exit;
      } else {
          print'
            <html>
            <head>
            <title>'.$gname.'</title>
              <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
              <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
              <link rel=stylesheet href="data/PCSs.css">
            </head>
            <body>
              <center>
              <br>
              <table width=50% align=center cellPadding=0 cellSpacing=0>
                <tbody>
                  <TR>
                    <TD align=center>
                      <b>Всего новостей: '.$news_count.'</b>
                    </TD>
                  </TR>
                </tbody>
              </table>
              <TABLE width=780 align=center cellPadding=0 cellSpacing=0>
                <TBODY>
                  <center>
                    <table>
                      <tr>
                        <td>
                          <TABLE cellSpacing=1 cellPadding=1 width=400 align=center border=0>
                            <TR vAlign=top bgColor=#1f2f3f>
                              <TD>
                                <TR bgColor=#1f2f3f>
                                  <TD align=middle colSpan=2>
                                    <FONT face=verdana color=#ffcc00 size=1><B>Добавить Новость</B></FONT>
                                  </TD>
                                </TR>
                                <form action="status.php" method=post>
                                  <TR>
                                    <TD align=right width=70>
                                      <FONT face=verdana color=#ffcc00 size=1>Имя:</FONT>
                                    </TD>
                                    <TD align=middle>
                                      <INPUT class=name style="width: 314px" name="name">
                                    </TD>
                                  </TR>
                                  <TR>
                                    <TD align=right>
                                      <FONT face=verdana color=#ffcc00 size=1>E-mail:</FONT>
                                    </TD>
                                    <TD align=middle>
                                      <INPUT class=name style="width: 314px" name="mail">
                                    </TD>
                                  </TR>
                                  <TR>
                                    <TD align=right width=70>
                                      <FONT face=verdana color=#ffcc00 size=1>Новость:</FONT>
                                    </TD>
                                    <TD align=middle>
                                      <textarea class=name style="width: 314px; height: 100px" cols=50 rows=4 size=500 name="mes"></textarea>
                                    </TD>
                                  </TR>
                                  <TR>
                                    <TD align=center colspan=2>
                                      <TABLE cellSpacing=0 cellPadding=1 bgColor=#425d7a border=0>
                                        <TR>
                                          <TD>
                                            <button type=submit>Добавить</button>
                                          </TD>
                                        </TR>
                                      </TABLE>
                                    </TD>
                                  </TR>
                                </form>
                              </TD>
                            </TR>
                          </TABLE>
                        </td>
                      </tr>
                    </table>
                </TBODY>
              </TABLE>
              <br><br>
              <TABLE cellSpacing=1 cellPadding=1 width=400 align=center bgColor=#ffcc00 border=0>
                <TR vAlign=top bgColor=#1f2f3f>
                  <TD>
                    <TABLE cellSpacing=0 cellPadding=1 width="100%" align=center border=0>
                      <TR bgColor=#1f2f3f>
                        <TD align=middle colSpan=2>
                          <FONT face=verdana color=#ffcc00 size=2><B>Все новости</B></FONT>
                        </TD>
                      </TR>
                    </TABLE>
                  </TD>
                </TR>
              </TABLE>';

          foreach(array_reverse($news) as $item) {
             print $item;
             $id = --$news_count;
             print"
             <TABLE>
               <TBODY>
                 <TR>
                   <TD>
                     <a href='admin.php?pswrd=$password&id=$id'>Удалить</a>
                   </TD>
                 </TR>
               </TBODY>
             </TABLE>";
          }

          unset($item);
          unset($id);
        }
    }
  }
?>