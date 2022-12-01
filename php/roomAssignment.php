<?php

include 'classAutoloader.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'GET'){

    if(isset($_GET['position']) and $_GET['position'] == 'check'){
        echo $_SESSION['position'];
    }

    if(isset($_GET['assignRoom'])){
        $room = filter_input(INPUT_GET, 'assignRoom', FILTER_SANITIZE_STRING);
        $resID1 = filter_input(INPUT_GET, 'resident1', FILTER_SANITIZE_STRING);
        $resID2 = filter_input(INPUT_GET, 'resident2', FILTER_SANITIZE_STRING);

        $roomContr = new RoomController();

        if($resID1 == "none"){
            $roomContr->assignResident1($room, "\`\`");
        }
        else{
            if($resID1 != -1){
                if($roomContr->findRoom($room) != ""){
                    $roomContr->assignResident1($room, $resID1);
                    echo "SUCCESSFULLY UPDATED ROOM 1";
                }
                else{
                    echo "ROOM NOT FOUND";
                }
            }
        }

        if($resID2 == "none"){
            $roomContr->assignResident2($room, "\`\`");
        }
        else{
            if($resID2 != -1){
                if($roomContr->findRoom($room) != ""){
                    $roomContr->assignResident2($room, $resID2);
                    echo "SUCCESSFULLY UPDATED ROOM 2";
                }
                else{
                    echo "ROOM NOT FOUND";
                }
            }
        }

        
        
    }

    if(isset($_GET['view'])){
        $roomView = new RoomView();

        echo $roomView->showAllRooms();
    }
}