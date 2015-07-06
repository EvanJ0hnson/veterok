<?
  #error_reporting  (E_ALL);
  include "config.php";

  if (!isset($_GET['pswrd'])) {
    echo"
      <html>
      <head>
        <title>Администрирование</title>
        <META HTTP-EQUIV='Pragma' CONTENT='no-cache'>
        <META HTTP-EQUIV='Cache-Control' CONTENT='no-cache'>
        <link rel=stylesheet href='data/PCSs.css'>
      </head>
      <body>
      <BR><BR><BR>
      <center>
      <form action='admin.php' method=GET name=pass>Введите пароль:
        <input class=button type=password name=pswrd>
        <input class=button type=submit value='Войти'>
        <SCRIPT language=JavaScript>
          document.pass.pswrd.focus();
          </SCRIPT>
      </form>";
  } else {
      if ($_GET['pswrd']=="$password") {
        if (isset($_GET['id'])) {
          // $page=$_GET['page'];
          $id=$_GET['id'];
          $news=file("data/news.txt");
          $news_count=count($news)-1;
          // if ($msginout==1) {
          //   $id=$news_count-$_GET['id'];
          // } else {
          //     $id=$news_count-$_GET['id']+2;
          //   }
          if ($news_count<1) {
            print"$back. Нужно оставить хотя бы одну новость.";
            exit;
          }

          $fp = fopen("data/news.txt","w");
          flock ($fp, LOCK_EX);
          for ($i = 0; $i < sizeof($news); $i++) {
            if ($i == $id) {
              unset($news[$i]);
            }
          }

          fputs($fp, implode("", $news));
          flock($fp, LOCK_UN);
          fclose($fp);

          Header("Location: admin.php?pswrd=$password");
          exit;
        } else {
            if (isset($_GET['page'])) {
              $page=$_GET['page'];
            } else {
                $page="1";
              }

              // определение общего количества новостей
  $news=file("data/news.txt");
  $news_count=count($news);
  $maxi=$news_count-1;
  print"
    <html>
    <head>
    <title>$gname</title>
      <META HTTP-EQUIV='Pragma' CONTENT='no-cache'>
      <META HTTP-EQUIV='Cache-Control' CONTENT='no-cache'>
      <link rel=stylesheet href='data/PCSs.css'>
    </head>
    <body>
      <center>
      <br>
      <table width=50% align=center cellPadding=0 cellSpacing=0>
        <tbody>
          <TR>
            <TD align=center>
              <b>Всего новостей: $news_count</b>
            </TD>
          </TR>
        </tbody>
      </table>";

  if ((!isset($_GET['event'])) or (isset($_GET['event'])) & ($_GET['event']!="add")) {
    $news=file('data/news.txt');
    $news_count=count($news);
    $maxi=$news_count-1;
  print'
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
    </TABLE>';

  // print "<font color=ffcc00 size=2 face=verdana>Страницы:&nbsp; ";
  // for($i=0; $i<$maxi+1;) {
  //   $ip=$i/$qq+1;
  //   if ($page==$ip) {
  //     print "<B>$ip</B> &nbsp;";
  //   } else {
  //       print "<a href=\"admin.php?pswrd=$password&page=$ip\">$ip</a> &nbsp;";
  //     }
  //   $i=$i+$qq;
  // }

  print"
    <br><br>
    <TABLE cellSpacing=1 cellPadding=1 width=400 align=center bgColor=#ffcc00 border=0>
      <TR vAlign=top bgColor=#1f2f3f>
        <TD>
          <TABLE cellSpacing=0 cellPadding=1 width='100%' align=center border=0>
            <TR bgColor=#1f2f3f>
              <TD align=middle colSpan=2>
                <FONT face=verdana color=#ffcc00 size=2><B>Все новости</B></FONT>
              </TD>
            </TR>
          </TABLE>
        </TD>
      </TR>
    </TABLE>";

  foreach(array_reverse($news) as $item) {
     print $item;
     $id = --$news_count;
     print"
     <TABLE width=780 align=center cellPadding=0 cellSpacing=0>
       <TBODY>
         <BR>
         <div align=right>
           <table border=0 bordercolor='1f2f3f'>
             <TR>
               <TD>
                 <a href='admin.php?pswrd=$password&id=$id'>Удалить</a>
               </TD>
             </TR>
           </TABLE>
         </div>
       </TBODY>
     </TABLE>";
  }
  unset($item);
  unset($id);

  // if ($page=="0") {
  //   $page="1";
  // } else {
  //     $page=abs($page);
  //   }

  // $maxpage=ceil(($maxi+1)/$qq);

  // if ($page>$maxpage) {
  //   $page=$maxpage;
  // }

  // if ($msginout=="1") {
  //   $fm=$qq*($page-1);
  //   if ($fm>$maxi) {
  //     $fm=$maxi-$qq;
  //   }
  //   $lm=$fm+$qq;
  //   if ($lm>$maxi) {
  //     $lm=$maxi+1;
  //   }
  // } else {
  //     $fm=$maxi-$qq*($page-1);
  //     if ($fm<"0") {
  //       $fm=$qq;
  //     }
  //     $lm=$fm-$qq;
  //     if ($lm<"0") {
  //       $lm="-1";
  //     }
  //   }

  // do {
  //   $dt = explode("|", $news[$fm]);
  //   if ($msginout=="1") {
  //     $fm++;
  //   } else {
  //       $fm--;
  //     }
  //   $num=$news_count-$fm;

  //   print"
  //   <TABLE width=780 align=center cellPadding=0 cellSpacing=0>
  //     <TBODY>
  //       <br>
  //       <em>$dt[0]</em>
  //       <BR>
  //       <div align=right>
  //         <table border=0 bordercolor='1f2f3f'>
  //           <TR>
  //             <TD bgcolor=#425d7a>
  //               <a href='admin.php?pswrd=$password&id=$num'>Удалить</a>
  //             </TD>
  //           </TR>
  //         </TABLE>
  //       </div>
  //     </TBODY>
  //   </TABLE>";


  //   if ($msginout=="1") {
  //     $whm=$fm; $whe=$lm;
  //   } else {
  //       $whm=$lm;
  //       $whe=$fm;
  //     }
  // } while ($whm < $whe);

  // print "</td></tr></table>";
  // print "<font color=ffcc00 size=2 face=verdana>Страницы:&nbsp; ";
  // for($i=0; $i<$maxi+1;) {
  //   $ip=$i/$qq+1;
  //   if ($page==$ip) {
  //     print "<B>$ip</B> &nbsp;";
  //   } else {
  //       print "<a href='admin.php?pswrd=$password&page=$ip'>$ip</a> &nbsp;";
  //     }
  //   $i=$i+$qq;
  // }
  // print "(дробление = <B>$qq</B>)";
  }
  }
  }
  }
?>
