package challenge;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import utility.JsonFileUtility;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * Codes Challenge For Edalex
 * @author Frank
 * @version 1.0 11/06/2020
 * 
 * Handel http resuest from React frontend
 */

@RestController
public class MessageController {

   /**
   * Gets all messages including message id and message content from a JSON file.
   * @return a message list to the frontend.
   */
    @RequestMapping(value = "/api/message", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    List<MessageModel> listMessages() {
        List<MessageModel> messages=Arrays.asList(JsonFileUtility.readJsonFile());
        return messages;
    }

   /**
   * Fuzzy Query
   * Gets messages whose content contains the specified words.
   * @return a filtered message list to the frontend.
   */
    @RequestMapping(value = "/api/message/messages/{option}", method = RequestMethod.OPTIONS)
    @CrossOrigin(origins = "http://localhost:3000")
    List<MessageModel> filterMessages(@PathVariable("option") String option) {
        MessageModel[] mmArray=JsonFileUtility.readJsonFile();
        List<MessageModel> messages=new ArrayList<MessageModel>();
        //The whole messages will be return if user didn't speicfy any character.
        if(!option.isEmpty()&&!("").equals(option)){
            for(MessageModel mm : mmArray){
                if(mm.getMessage().toLowerCase().contains(option.toLowerCase())){
                    messages.add(mm);
                }
            }
        }else{
            messages=Arrays.asList(JsonFileUtility.readJsonFile());
        }
        
        return messages;
    }

   /**
   * Gets specified message information according to the message id.
   * @return a message object to the front.
   */
    @RequestMapping(value = "/api/message/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    MessageModel getMessage(@PathVariable("id") Long id) {
        MessageModel[] mmArray=JsonFileUtility.readJsonFile();
        MessageModel selectedMm=new MessageModel();
        for(MessageModel mm : mmArray){
            selectedMm=mm;
        }
        return selectedMm;
    }

   /**
   * Add new message into a JSON file.
   * @return all messages to the frontend to update the table list immediately.
   */
    @RequestMapping(value = "/api/message/messages", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public List<MessageModel> createMessage(@RequestBody MessageModel msg) {
        List<MessageModel> messages=new ArrayList<MessageModel>();
        MessageModel[] mmArray=JsonFileUtility.readJsonFile();
        messages.add(msg); 
        for(MessageModel mm : mmArray){
            messages.add(mm);
        }
        JsonFileUtility.writeJsonFile(messages);
        return messages;
    }
    
   /**
   * Remove the specified message object from a JSON file according to the message id.
   * @return a feedback to the frontend.
   */
    @RequestMapping(value = "/api/message/messages/{id}", method = RequestMethod.DELETE)
    @CrossOrigin(origins = "http://localhost:3000")
    public String delete(@PathVariable("id") Long id) {
        List<MessageModel> messages=Arrays.asList(JsonFileUtility.readJsonFile());
        List<MessageModel> newMessages = new ArrayList<MessageModel>();
        for (MessageModel mm : messages) {
            if (!id.equals(mm.getId())) {
                newMessages.add(mm);
            }
        }
        JsonFileUtility.writeJsonFile(newMessages);
        return "Removed";
    }

    /**
   * Updated the specified message object to a JSON file according to the message id.
   * @return a feedback to the frontend.
   */
    @RequestMapping(value = "/api/message/messages/{id}", method = RequestMethod.PUT)
    @CrossOrigin(origins = "http://localhost:3000")
    public String updateMessage(@PathVariable("id") Long id, @RequestBody MessageModel msg) { 
        List<MessageModel> messages=Arrays.asList(JsonFileUtility.readJsonFile());
        List<MessageModel> newMessages = new ArrayList<MessageModel>();
        //Long updatedId = Long.parseLong(id);
        for (MessageModel mm : messages) {
            if (id.equals(mm.getId())) {
                newMessages.add(msg);
            }else{
                newMessages.add(mm);
            }
        }
        JsonFileUtility.writeJsonFile(newMessages);
      return "Updated";
   }
}
