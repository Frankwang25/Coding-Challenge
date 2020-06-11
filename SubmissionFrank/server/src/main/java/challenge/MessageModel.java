package challenge;

/*
 * Codes Challenge For Edalex
 * @author Frank
 * @version 1.0 11/06/2020
 * 
 * A model class of message including two properties: id and message
 * The properties are private to keep them safe in this project, 
 * but a getter and setter method provide an access for outside this class.
 */

public class MessageModel {
    private long id;
    private String message;


    public MessageModel(long id, String message) {
        this.id = id;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

	public void setId(long id) {
		this.id = id;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public MessageModel() {
		super();
	}
}
