import '../src/style_skeleton_normalize//skeleton.css';
import '../src/style_skeleton_normalize//normalize.css';

import './styles.css';

import $ from 'jquery';
import Chat from './Chat';

const talk = new Chat({
    onMessage: addDialog,
});

const $dialog = $('#dialog');
const $messageInput = $('#message');
const $authorInput = $('#author');

$('#chatForm').on('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

talk.initConnection();

function addDialog({ payload }) {
    const $message = $(`<div>User name: ${payload.username};</div> <div>Message:  ${payload.message}</div>`);
    $dialog.append($message);
    setTimeout(() => {
        $message.addClass('message');
    });
}

function sendMessage() {
    talk.send($authorInput.val(), $messageInput.val());
    $messageInput.val('');
}
