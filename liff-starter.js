window.onload = function (e) {
    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;

    // 外部URLを開く
    document.getElementById('openwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            //url: 'https://line.me'
            url: './page1.html'
        });
    });

    // 内部URLを開く
    document.getElementById('openinnerwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            //url: 'https://line.me'
            url: './page1.html',
            external: false,
        });
    });

    // ウィンドウを閉じる
    document.getElementById('closewindowbutton').addEventListener('click', function () {
        liff.closeWindow();
    });

    // メッセージを送信する
    document.getElementById('sendmessagebutton').addEventListener('click', function () {
        liff.sendMessages([{//送信メッセージ
            type: 'text',
            text: "メッセージが送れたよ！やったー!"
        }, {
            type: 'sticker',
            packageId: '2',
            stickerId: '144'
        }])
        // .then(function () {
        //     window.alert("メッセージを送信しました");//送信後にアラートを表示する
        // })
        // .catch(function (error) {
        //     window.alert("メッセージの送信に失敗しました: " + error);
        // }
        // );
    });

    // get access token
    document.getElementById('getaccesstoken').addEventListener('click', function () {
        const accessToken = liff.getAccessToken();
        document.getElementById('accesstokenfield').textContent = accessToken;
        toggleAccessToken();
    });

    // get profile call
    document.getElementById('getprofilebutton').addEventListener('click', function () {
        liff.getProfile().then(function (profile) {
            document.getElementById('useridprofilefield').textContent = profile.userId;
            document.getElementById('displaynamefield').textContent = profile.displayName;

            const profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = "Profile Picture";
            profilePictureDiv.appendChild(img);

            document.getElementById('statusmessagefield').textContent = profile.statusMessage;
            toggleProfileData();
        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
    });
}

function toggleAccessToken() {
    toggleElement('accesstokendata');
}

function toggleProfileData() {
    toggleElement('profileinfo');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}