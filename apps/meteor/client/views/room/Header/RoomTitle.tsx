import { isTeamRoom, type IRoom } from '@rocket.chat/core-typings';
import { useEffectEvent } from '@rocket.chat/fuselage-hooks';
import { HeaderTitle, HeaderTitleButton, useDocumentTitle } from '@rocket.chat/ui-client';
import type { KeyboardEvent, ReactElement } from 'react';
import React from 'react';

import { useRoomToolbox } from '../contexts/RoomToolboxContext';
import HeaderIconWithRoom from './HeaderIconWithRoom';

import { useSession } from '@rocket.chat/ui-contexts';

const RoomTitle = ({ room }: { room: IRoom }): ReactElement => {
	console.log("RoomTitle", "room", room);

	const getUnreadMessages = (): number => {
		const unreadMessages = useSession('unread') as number | '' | '999+' | '•';
		if (typeof unreadMessages !== 'number') {
			return 0;
		}
		return  unreadMessages;
	};
	
	const allUnread = getUnreadMessages();
	console.log("RoomTitle", "allUnread", allUnread);
	const roomUnread = room.unread === undefined ? 0 : room.unread;
	const otherUnread = allUnread - roomUnread;
	
	// useDocumentTitle(room.name, false);
	useDocumentTitle(

		// Room Title (room unread)
		// Mark Watney (4)
		// room.name  + (room.unread && room.unread > 0 ? ' (' + room.unread + ')' : ''),
		// (room unread) Room Title
		// (4) Mark Watney
		(room.unread && room.unread > 0 ? '(' + room.unread + ') ' : '') + room.name,
		// room.name + (roomUnread > 0 ? ' (' + roomUnread + ')' : '') + ' [' + otherUnread + ']',
		// room.name + (otherUnread > 0 ? ' [' + otherUnread + ']' : '')
		// Room Title [Unread Messages: X | Total Unread: Y]
        // Mark Watney [ 0 | 4]
		// room.name + ' [' + roomUnread + ' | ' + otherUnread + ']',
		
		false
	);

	const { openTab } = useRoomToolbox();

	const handleOpenRoomInfo = useEffectEvent(() => {
		if (isTeamRoom(room)) {
			return openTab('team-info');
		}

		switch (room.t) {
			case 'l':
				openTab('room-info');
				break;

			case 'v':
				openTab('voip-room-info');
				break;

			case 'd':
				(room.uids?.length ?? 0) > 2 ? openTab('user-info-group') : openTab('user-info');
				break;

			default:
				openTab('channel-settings');
				break;
		}
	});

	return (
		<HeaderTitleButton
			onKeyDown={(e: KeyboardEvent) => (e.code === 'Enter' || e.code === 'Space') && handleOpenRoomInfo()}
			onClick={() => handleOpenRoomInfo()}
			tabIndex={0}
			role='button'
		>
			<HeaderIconWithRoom room={room} />
			<HeaderTitle is='h1'>{room.name}</HeaderTitle>
		</HeaderTitleButton>
	);
};



export default RoomTitle;
